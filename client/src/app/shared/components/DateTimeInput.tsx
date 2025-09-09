import {
  useController,
  type FieldValues,
  type FieldPath,
  type FieldPathValue,
  type UseControllerProps,
} from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import type React from "react";

type PickerProps = Omit<React.ComponentProps<typeof DateTimePicker>, "value" | "onChange">;

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  UseControllerProps<TFieldValues, TName> & PickerProps;

export default function DateTimeInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(props: Props<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>({
    defaultValue: null as FieldPathValue<TFieldValues, TName>,
    ...props,
  });

  return (
    <DateTimePicker
      {...props}
      value={(field.value as Date | null) ?? null}
      onChange={(val) => field.onChange(val)}
      onClose={field.onBlur}
      onAccept={() => field.onBlur()}
      slotProps={{
        textField: {
          onBlur: field.onBlur,
          error: !!fieldState.error,
          helperText: fieldState.error?.message,
          fullWidth: true,
        },
      }}
    />
  );
}
