import * as React from "react";
import { FormProvider, type UseFormReturn, Controller } from "react-hook-form";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type FormProps<T extends Record<string, unknown>> = {
  children: React.ReactNode;
} & UseFormReturn<T>;

export function Form<T extends Record<string, unknown>>(props: FormProps<T>) {
  const { children, ...methods } = props as any;
  return <FormProvider {...methods}>{children}</FormProvider>;
}

export const FormField = Controller;

export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export function FormLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-medium", className)} {...props} />;
}

export function FormControl({ className, ...props }: React.ComponentProps<typeof Slot>) {
  return <Slot className={cn(className)} {...props} />;
}

export function FormMessage({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  if (!children) return null;
  return (
    <p className={cn("text-sm text-red-400", className)} {...props}>
      {children}
    </p>
  );
}


