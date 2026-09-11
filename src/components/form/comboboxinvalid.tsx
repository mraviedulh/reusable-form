"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

interface ComboboxInvalidProps {
  /** Dipanggil saat user memilih item -> App.tsx bisa kembalikan ke ComboboxBasic. */
  onValueChange?: (value: string) => void;
}

export function ComboboxInvalid({ onValueChange }: ComboboxInvalidProps) {
  return (
    <Field data-invalid>
      <FieldLabel>Select a framework</FieldLabel>
      <Combobox items={frameworks} onValueChange={onValueChange}>
        <ComboboxInput placeholder="Select a framework" aria-invalid="true" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription>This field cannot be blank.</FieldDescription>
    </Field>
  );
}
