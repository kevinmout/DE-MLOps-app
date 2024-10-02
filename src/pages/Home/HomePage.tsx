import {
  Button,
  FileButton,
  Group,
  Textarea,
  Text,
  Container,
} from "@mantine/core";
import { useRef, useState } from "react";

export const HomePage = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const [text, setText] = useState("");

  const countWords = (input: string) => {
    // Trim the input and split by whitespace to count words
    return input
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (err) {
      console.error("Failed to read clipboard: ", err);
    }
  };

  return (
    <Container>
      <Group>
        <FileButton
          resetRef={resetRef}
          onChange={setFile}
          accept=".pdf,.doc,.docx"
        >
          {(props) => <Button {...props}>Upload doc</Button>}
        </FileButton>
        <Button disabled={!file} color="red" onClick={clearFile}>
          Reset
        </Button>
      </Group>

      {file && (
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )}

      <Textarea
        label="Label"
        placeholder="Add text here. For best results, we recommend minimum 80 words"
        description="Description"
        withAsterisk
        autosize
        minRows={2}
        maxRows={25}
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />

      <Button onClick={handlePaste} mt="md">
        Paste
      </Button>

      {countWords(text) > 1200 ? (
        <Text color="red">
          Word Count: {countWords(text)} / {1200}
        </Text>
      ) : (
        <Text>
          Word Count: {countWords(text)} / {1200}
        </Text>
      )}

      <Button disabled={countWords(text) > 1200 || countWords(text) === 0}>
        Analyze text
      </Button>
    </Container>
  );
};
