"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ProjectVisibility } from "@/utils/db"

const visibilities: { value: ProjectVisibility; label: string }[] = [
  {
    value: ProjectVisibility.PUBLIC,
    label: "Public",
  },
  {
    value: ProjectVisibility.PRIVATE,
    label: "Private",
  },
  {
    value: ProjectVisibility.UNLISTED,
    label: "Unlisted",
  },
]

export function ComboboxVisibility({
  visibility,
  onVisibilityChange,
}: {
  visibility?: ProjectVisibility
  onVisibilityChange?: (visibility: ProjectVisibility) => void
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<ProjectVisibility | undefined>(visibility)

  function handleSelect(value: ProjectVisibility) {
    setValue(value)
    setOpen(false)

    if (onVisibilityChange) {
      onVisibilityChange(value)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {visibilities.find(framework => framework.value === value)?.label ||
            "Select a visibility"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No visibility found.</CommandEmpty>
            <CommandGroup>
              {visibilities.map(framework => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={value => handleSelect(value as ProjectVisibility)}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
