import { FieldLabel, Field, FieldError } from "./ui/field";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "./ui/input";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type: "text" | "email" | "password" | "file";
}


const FormField = ({control, name, label, placeholder, type="text"}:FormFieldProps<T>) => (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-input-username" className="label">
              {label}
            </FieldLabel>
            <Input
              {...field}
              id="form-rhf-input-username"
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete="username"
              type={type}
              className="input"
            />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
          </Field>
          )}
      />
)

export default FormField