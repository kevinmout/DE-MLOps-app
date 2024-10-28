import { useState } from "react";
import { Button, Center, Container, Paper } from "@mantine/core";
import { usePostText, useRefreshModel } from "../../api/fastapi/model";
import { TextInput } from "./components/TextInput";
import { WordCounter } from "./components/WordCounter";
import { FeedbackButtons } from "./components/FeedbackButtons";
import { RefreshButton } from "./components/RefreshButton";

export const HomePage = (): JSX.Element => {
  const createText = usePostText();
  const { isFetching, refetch } = useRefreshModel({
    enabled: false,
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | object | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState<string>(""); // State for text input
  const [wordCount, setWordCount] = useState<number>(0); // State for word count

  const handlePostText = (text: string) => {
    setLoading(true);
    createText.mutate(
      { text: text },
      {
        onSuccess: (data) => {
          setLoading(false);
          setResponse(data); // Set response to the received data
          setError(null); // Clear error state on success
        },
        onError: () => {
          setLoading(false);
          setError("Try to refresh the model!"); // Set error message
          setResponse(null); // Clear the response
        },
      }
    );
  };

  function handleClick() {
    refetch();
  }

  return (
    <Container>
      <RefreshButton onClick={handleClick} loading={isFetching} />
      <TextInput onTextChange={setText} />

      <WordCounter text={text} onWordCountChange={setWordCount} />

      <Button
        loading={loading}
        disabled={wordCount > 1200 || wordCount === 0}
        onClick={() => {
          handlePostText(text);
          setResponse("");
        }}
      >
        Analyze text
      </Button>

      <Center>
        <Paper>
          {typeof response === "string" && response !== "" && (
            <>
              <p color="green">This text can be classified as: {response}</p>
              <p>
                Is this classified wrongly? Please indicate below what it should
                be classified as:
              </p>
              <FeedbackButtons predicted_class={response} text={text} />
            </>
          )}

          {/* Display error message if there's an error */}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </Paper>
      </Center>
    </Container>
  );
};
