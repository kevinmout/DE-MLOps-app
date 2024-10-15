import { Textarea, Button } from "@mantine/core";
import { useState } from "react";

export const TextInput = ({
  onTextChange,
}: {
  onTextChange: (text: string) => void;
}) => {
  const [text, setText] = useState("");

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      onTextChange(clipboardText); // Send the text to the parent
    } catch (err) {
      console.error("Failed to read clipboard: ", err);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.currentTarget.value;
    setText(newText);
    onTextChange(newText); // Send the text to the parent
  };

  return (
    <>
      <Textarea
        label="Label"
        placeholder="Add text here. For best results, we recommend minimum 80 words"
        description="Description"
        withAsterisk
        autosize
        minRows={2}
        maxRows={25}
        value={text}
        onChange={handleTextChange}
      />
      {/* <Button onClick={handlePaste} mt="md">
        Paste
      </Button> */}
    </>
  );
};
