"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function YearPicker({ onYearChange }) {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear() - 1
  );
  const [open, setOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const startYear = 2023;

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => currentYear - index
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedYear}
          <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {years.map((year) => (
              <CommandItem
                key={year}
                onSelect={(currentValue) => {
                  setSelectedYear(currentValue === year ? "" : currentValue);
                  onYearChange(currentValue);
                  setOpen(false);
                }}
              >
                {year}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedYear === `${year}` ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default YearPicker;
