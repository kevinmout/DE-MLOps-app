import { Button, Group } from "@mantine/core";
import {
  RiEmotionHappyFill,
  RiEmotionNormalFill,
  RiEmotionSadFill,
} from "react-icons/ri";
import { usePostFeedback } from "../../../api/fastapi/model";
import { Feedback } from "../../../api/models/Feedback";

interface Props {
  predicted_class: string;
  text: string;
}

export const FeedbackButtons = (props: Props) => {
  const createFeedback = usePostFeedback();

  const handlePostText = (feedback: Feedback) => {
    createFeedback.mutate(
      {
        input_text: feedback.input_text,
        predicted_class: feedback.predicted_class,
        correct_class: feedback.correct_class,
      },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.error("An error occurred!", error);
        },
      }
    );
  };

  return (
    <Group>
      <Button
        onClick={() =>
          handlePostText({
            input_text: props.text,
            predicted_class: props.predicted_class,
            correct_class: "positive", // Set correct class as "positive"
          })
        }
        color="green"
        size="lg"
      >
        <RiEmotionHappyFill size={24} />
      </Button>

      <Button
        onClick={() =>
          handlePostText({
            input_text: props.text,
            predicted_class: props.predicted_class,
            correct_class: "neutral", // Set correct class as "neutral"
          })
        }
        color="yellow"
        size="lg"
      >
        <RiEmotionNormalFill size={24} />
      </Button>

      <Button
        onClick={() =>
          handlePostText({
            input_text: props.text,
            predicted_class: props.predicted_class,
            correct_class: "negative", // Set correct class as "negative"
          })
        }
        color="red"
        size="lg"
      >
        <RiEmotionSadFill size={24} />
      </Button>
    </Group>
  );
};
