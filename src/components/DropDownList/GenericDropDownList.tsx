import { Select } from "@mantine/core";

interface Props {
  value: number;
  data: { value: string; label: string }[];
  onChange: (value: number) => void;
}

export const GenericDropDownList = (props: Props): JSX.Element => {
  return (
    <Select
      label=""
      placeholder=""
      data={props.data}
      value={props.value.toString()}
      onChange={(value) => {
        props.onChange(parseInt(value!));
      }}
    />
  );
};
