import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface InputDisabledProps {
  /** Username dari InputField, dipakai untuk membentuk email otomatis. */
  username?: string;
}

export function InputDisabled({ username = "" }: InputDisabledProps) {
  const emailValue = username ? `${username}@gmail.com` : "";
  return (
    <Field data-disabled>
      <FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
      <Input
        id="input-demo-disabled"
        type="email"
        placeholder="xxxxxx@gmail.com"
        value={emailValue}
        disabled
        readOnly
      />
      <FieldDescription>
        {username
          ? "Generated automatically from your username."
          : "This field is currently disabled."}
      </FieldDescription>
    </Field>
  );
}
