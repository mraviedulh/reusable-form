import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface InputFieldProps {
  /** Nilai terkontrol (opsional). Jika tidak diisi, komponen mengelola state sendiri. */
  value?: string;
  /** Dipanggil setiap kali nilai input berubah. */
  onChange?: (value: string) => void;
}

export function InputField({ value, onChange }: InputFieldProps) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value;
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  }
  return (
    <Field>
      <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
      <Input
        id="input-field-username"
        type="text"
        placeholder="Enter your username"
        value={currentValue}
        onChange={handleChange}
      />
      <FieldDescription>
        Choose a unique username for your account.
      </FieldDescription>
    </Field>
  );
}
