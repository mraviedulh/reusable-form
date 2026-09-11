"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldLabel } from "@/components/ui/field";

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

interface ComboboxBasicProps {
  /** Nilai terpilih saat ini (opsional, untuk dibaca dari App.tsx). */
  value?: string;
  /** Dipanggil saat user memilih salah satu item. */
  onValueChange?: (value: string) => void;
}

export function ComboboxBasic({ value, onValueChange }: ComboboxBasicProps) {
  return (
    <Field>
      <FieldLabel htmlFor="combobox">Select a framework</FieldLabel>
      <Combobox items={frameworks} value={value} onValueChange={onValueChange}>
        <ComboboxInput placeholder="Select a framework" />
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
    </Field>
  );
}
