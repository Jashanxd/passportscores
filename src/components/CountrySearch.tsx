import { useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PASSPORTS, getPassport } from "@/data/passports";
import { Flag } from "@/components/Flag";

interface Props {
  value?: string | null | undefined;
  onChange: (iso: string) => void;
  placeholder?: string;
  className?: string;
  size?: "default" | "lg";
}

export function CountrySearch({
  value,
  onChange,
  placeholder = "Search a country…",
  className,
  size = "default",
}: Props) {
  const [open, setOpen] = useState(false);
  const selected = getPassport(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between border-border bg-card font-normal shadow-none",
            size === "lg" ? "h-14 px-5 text-base" : "h-11 px-4 text-sm",
            className,
          )}
        >
          <span className="flex min-w-0 items-center gap-3">
            {selected ? (
              <>
                <Flag iso={selected.iso} name={selected.name} />
                <span className="truncate">{selected.name}</span>
                <span className="tnum text-muted-foreground">#{selected.rank}</span>
              </>
            ) : (
              <>
                <Search className="size-4 text-muted-foreground" />
                <span className="text-muted-foreground">{placeholder}</span>
              </>
            )}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command
          filter={(itemValue, search) =>
            itemValue.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }
        >
          <CommandInput placeholder="Type a country…" />
          <CommandList className="max-h-72">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {PASSPORTS.map((p) => (
                <CommandItem
                  key={p.iso}
                  value={`${p.name} ${p.iso} ${p.regionLabel}`}
                  onSelect={() => {
                    onChange(p.iso);
                    setOpen(false);
                  }}
                  className="gap-3"
                >
                  <Flag iso={p.iso} name={p.name} />
                  <span className="flex-1 truncate">{p.name}</span>
                  <span className="tnum text-xs text-muted-foreground">#{p.rank}</span>
                  {value === p.iso && <Check className="size-4 text-primary" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
