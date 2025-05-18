import { TextField, type TextFieldProps } from "@mui/material";
import { useEffect, useImperativeHandle, useState, type ChangeEvent, type Ref } from "react";

export type DebouncedTextInputRef = {
  reset: () => void;
};

type DebouncedTextInputProps = {
  value: string;
  setValue: (value: React.SetStateAction<string>) => void;
  delay?: number;
  inputRef?: Ref<DebouncedTextInputRef>;
} & TextFieldProps;

function DebouncedTextInput({ value, setValue, delay = 250, inputRef, ...props }: DebouncedTextInputProps) {
  const [innerValue, setInnerValue] = useState<string>(value);

  function handleChangeInnerValue(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setInnerValue(newValue);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(innerValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [innerValue, delay, setValue]);

  useImperativeHandle(
    inputRef,
    () => {
      return {
        reset: () => {
          setInnerValue("");
        },
      };
    },
    []
  );

  return <TextField value={innerValue} onChange={handleChangeInnerValue} {...props} />;
}

export default DebouncedTextInput;
