import { useState } from 'react';
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

// Zod schema enforces required fields and types. Dates use JS Date instances for calendar component.
const formSchema = z.object({
  Origin: z.string().min(2, { message: "Origin must be at least 2 characters." }),
  Destination: z.string().min(2, { message: "Destination must be at least 2 characters." }),
  "Departure Date": z.date({ required_error: "Departure date is required." }),
  "Return Date": z.date({ required_error: "Return date is required." }),
  Activities: z.string().min(3, { message: "Describe desired activities." }),
  "Number of Travelers": z.coerce.number().min(1, { message: "Must have at least 1 traveler." }),
  Email: z.string().email({ message: "Please enter a valid email address." }),
}).refine((data) => data["Return Date"] >= data["Departure Date"], {
  message: "Return date cannot be before departure date.",
  path: ["Return Date"],
});

export function TripForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const N8N_WEBHOOK_URL = "https://n8n.1to10x.ai/webhook/ai-trip-advisor";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { Origin: "", Destination: "", Activities: "", "Number of Travelers": 1, Email: "" },
  });

  // Handles submission with a guaranteed 10s loading overlay
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Set loading immediately so UI reflects pending state
    setIsSubmitting(true);
    setShowOverlay(true);
    // Ensure no stray hash navigation interferes with UX
    try {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
      }
    } catch {}
    try {
      const payload = {
        ...values,
        "Departure Date": format(values["Departure Date"], "yyyy-MM-dd"),
        "Return Date": format(values["Return Date"], "yyyy-MM-dd"),
      };
      // Run webhook and enforce a minimum 10s loading
      await Promise.all([axios.post(N8N_WEBHOOK_URL, payload), delay(10000)]);
      toast(
        "Success! Your journey is being planned.",
        {
          description: "Your personalized itinerary will arrive in your inbox shortly.",
          className: "bg-green-700 text-white border-green-700",
        }
      );
      setShowSuccess(true);
      // Brief success state, then close dialog and reset overlay
      setTimeout(() => {
        setOpen(false);
        form.reset();
        setShowOverlay(false);
        setShowSuccess(false);
      }, 1200);
    } catch (error) {
      toast.error(
        "Something went wrong.",
        {
          description: "There was a problem with your request. Please try again.",
        }
      );
      setShowOverlay(false);
    } finally {
      // Always clear loading, success or error
      setIsSubmitting(false);
    }
  }

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button id="tripform-trigger" size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg py-7 px-8 rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105" aria-busy={isSubmitting}>
          Plan Your Dream Trip Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-slate-900 border-slate-700 text-slate-50">
        <DialogHeader>
          <DialogTitle>Trip Details</DialogTitle>
          <DialogDescription>Enter all details, and our AI will craft the perfect trip for you.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit(onSubmit)(e);
            }}
            className="space-y-4 pt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="Origin" render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Origin</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="Destination" render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Paris" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="Departure Date" render={({ field }: { field: any }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Departure Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) => date < new Date(new Date().setHours(0,0,0,0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}/>

              <FormField control={form.control} name="Return Date" render={({ field }: { field: any }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Return Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) => {
                          const dep = form.getValues("Departure Date");
                          return date < (dep || new Date());
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>

            <FormField control={form.control} name="Activities" render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Desired Activities</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Museums, Hiking, Beaches" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

            <FormField control={form.control} name="Number of Travelers" render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Number of Travelers</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

            <FormField control={form.control} name="Email" render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(onSubmit)();
              }}
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-600 !mt-6"
            >
              {showSuccess ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Success
                </span>
              ) : isSubmitting ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Planning...
                </span>
              ) : (
                'Craft My Itinerary'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    {showOverlay && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
        <div className="text-center">
          {showSuccess ? (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle2 className="h-12 w-12 text-green-400" />
              <p className="text-lg text-slate-200">Success! Finalizing your itinerary...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-blue-400" />
              <p className="text-lg text-slate-200">Planning your dream trip...</p>
              <p className="text-sm text-slate-400">This takes ~10 seconds as we analyze flights, hotels, and activities.</p>
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
}


