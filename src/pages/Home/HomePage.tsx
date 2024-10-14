import { useState } from 'react';
import { Button } from '@mantine/core';
import { usePostText } from '../../api/fastapi/model';
import { TextInput } from './components/TextInput';
import { WordCounter } from './components/WordCounter';

export const HomePage = (): JSX.Element => {
  const createText = usePostText();
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState(''); // State for text input
  const [wordCount, setWordCount] = useState(0); // State for word count

  const handlePostText = (text: string) => {
    createText.mutate(
      { text: text },
      {
        onSuccess: (data) => {
          setResponse(JSON.stringify(data));
          setError(null);
        },
        onError: (error) => {
          setError('An error occurred!');
          setResponse(null);
        },
      }
    );
  };

  return (
    <>
      <TextInput onTextChange={setText} />

      <WordCounter text={text} onWordCountChange={setWordCount} />

      <Button
        disabled={wordCount > 1200 || wordCount === 0}
        onClick={() => {
          handlePostText(text);
          setResponse('');
        }}
      >
        Analyze text
      </Button>

      {response && <p>Response: {response}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </>
  );
};
