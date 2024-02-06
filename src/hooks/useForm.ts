import { ChangeEvent, useState } from "react";

type UseFormProps = { [name: string]: string };
export function useForm(inputValues: UseFormProps) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
