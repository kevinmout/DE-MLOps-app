import { useState } from "react";
import { Button } from "@mantine/core";
import { usePostText } from "../../api/fastapi/model";
import { TextInput } from "./components/TextInput";
import { WordCounter } from "./components/WordCounter";
import { FeedbackButtons } from "./components/FeedbackButtons";

export const HomePage = (): JSX.Element => {
  const createText = usePostText();
  const [response, setResponse] = useState<string | object | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState<string>(""); // State for text input
  const [wordCount, setWordCount] = useState<number>(0); // State for word count

  const handlePostText = (text: string) => {
    createText.mutate(
      { text: text },
      {
        onSuccess: (data) => {
          setResponse(data); // Set response to the received data
          setError(null); // Clear error state on success
        },
        onError: () => {
          setError("An error occurred!"); // Set error message
          setResponse(null); // Clear the response
        },
      }
    );
  };

  return (
    <>
      {/* Text input for user text */}
      <TextInput onTextChange={setText} />

      {/* Word counter to display and manage word count */}
      <WordCounter text={text} onWordCountChange={setWordCount} />

      {/* Button to trigger text analysis, disabled when word count is invalid */}
      <Button
        disabled={wordCount > 1200 || wordCount === 0}
        onClick={() => {
          handlePostText(text);
          setResponse(""); // Clear previous response when making a new request
        }}
      >
        Analyze text
      </Button>

      {/* Display the response if it's a string */}
      {typeof response === "string" && response !== "" && (
        <>
          <p>Response: {response}</p>
          <FeedbackButtons predicted_class={response} text={text} />
        </>
      )}

      {/* Display error message if there's an error */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </>
  );
};
