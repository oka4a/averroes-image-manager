import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export type OptionShape = { label: string | number; value: string | number };
interface IProps<Option extends OptionShape, FieldKeys extends FieldValues> {
  control: Control<FieldKeys>;
  name: Path<FieldKeys>;
  options?: Option[];
  label?: ReactNode;
  fullWidth?: boolean;
  placeholder?: string;
  textFieldProps?: TextFieldProps;
  disabled?: boolean;
  type?: string;
  required?: boolean;
}

// A reusable react-hook-form input component using MUI's TextField, supporting both text input and select options.
function RHFTextField<
  Option extends OptionShape,
  FieldKeys extends FieldValues,
>(props: IProps<Option, FieldKeys>) {
  const {
    control,
    name,
    fullWidth,
    label,
    placeholder,
    textFieldProps,
    options,
    type,
    disabled,
    required,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ...rest },
        fieldState: { error },
      }) => (
        <TextField
          fullWidth={fullWidth}
          value={value ?? ""}
          label={label}
          type={type}
          select={!!options}
          disabled={disabled}
          placeholder={placeholder}
          onChange={
            textFieldProps?.onChange ??
            ((e) => {
              const emptyValue = required ? "" : undefined;
              onChange(e.target.value || emptyValue);
            })
          }
          error={!!error}
          {...rest}
          {...textFieldProps}
        >
          {options
            ? options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            : null}
        </TextField>
      )}
    />
  );
}

export default RHFTextField;
