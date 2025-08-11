import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2 bg-slate-900 text-slate-100", className)}
      classNames={{
        caption_label: "text-sm font-medium",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-800 rounded-md",
        day_selected: "bg-blue-600 text-white hover:bg-blue-600",
        head_cell: "text-slate-400 font-normal",
        ...classNames,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";
export { Calendar };


