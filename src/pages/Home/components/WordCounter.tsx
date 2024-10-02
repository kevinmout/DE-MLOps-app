import { Text } from "@mantine/core";
import { useEffect } from "react";

export const WordCounter = ({
  text,
  onWordCountChange,
}: {
  text: string;
  onWordCountChange: (count: number) => void;
}) => {
  const countWords = (input: string) => {
    return input
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const wordCount = countWords(text);

  useEffect(() => {
    onWordCountChange(wordCount); // Send word count to parent when it changes
  }, [wordCount, onWordCountChange]);

  return (
    <>
      {wordCount > 1200 ? (
        <Text color="red">
          Word Count: {wordCount} / {1200}
        </Text>
      ) : (
        <Text>
          Word Count: {wordCount} / {1200}
        </Text>
      )}
    </>
  );
};
