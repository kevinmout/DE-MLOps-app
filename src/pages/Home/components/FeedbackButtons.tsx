import { Button, Center, Container, Flex, Modal } from '@mantine/core';
import {
  RiEmotionHappyFill,
  RiEmotionNormalFill,
  RiEmotionSadFill,
} from 'react-icons/ri';
import { usePostFeedback } from '../../../api/fastapi/model';
import { Feedback } from '../../../api/models/Feedback';
import { useState } from 'react';

interface Props {
  predicted_class: string;
  text: string;
}

export const FeedbackButtons = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const createFeedback = usePostFeedback();

  const handlePostText = (feedback: Feedback) => {
    setLoading(true);
    createFeedback.mutate(
      {
        input_text: feedback.input_text,
        predicted_class: feedback.predicted_class,
        correct_class: feedback.correct_class,
      },
      {
        onSuccess: (data) => {
          setLoading(false);
          setModalOpen(true); // Open the modal on success
          console.log(data);
        },
        onError: (error) => {
          setLoading(false);
          console.error('An error occurred!', error);
        },
      }
    );
  };

  const renderButtons = () => {
    switch (props.predicted_class) {
      case 'positive':
        return (
          <Container>
            <Button
              loading={loading}
              onClick={() =>
                handlePostText({
                  input_text: props.text,
                  predicted_class: props.predicted_class,
                  correct_class: 'neutral',
                })
              }
              color='yellow'
              size='lg'
            >
              <RiEmotionNormalFill size={24} />
            </Button>
            <Button
              loading={loading}
              onClick={() =>
                handlePostText({
                  input_text: props.text,
                  predicted_class: props.predicted_class,
                  correct_class: 'negative',
                })
              }
              color='red'
              size='lg'
            >
              <RiEmotionSadFill size={24} />
            </Button>
          </Container>
        );
      case 'neutral':
        return (
          <Container>
            <Button
              loading={loading}
              onClick={() =>
                handlePostText({
                  input_text: props.text,
                  predicted_class: props.predicted_class,
                  correct_class: 'positive',
                })
              }
              color='green'
              size='lg'
            >
              <RiEmotionHappyFill size={24} />
            </Button>
            <Button
              loading={loading}
              onClick={() =>
                handlePostText({
                  input_text: props.text,
                  predicted_class: props.predicted_class,
                  correct_class: 'negative',
                })
              }
              color='red'
              size='lg'
            >
              <RiEmotionSadFill size={24} />
            </Button>
          </Container>
        );
      case 'negative':
        return (
          <Container>
            <Button
              loading={loading}
              onClick={() =>
                handlePostText({
                  input_text: props.text,
                  predicted_class: props.predicted_class,
                  correct_class: 'positive',
                })
              }
              color='green'
              size='lg'
            >
              <RiEmotionHappyFill size={24} />
            </Button>
            <Button
              loading={loading}
              onClick={() =>
                handlePostText({
                  input_text: props.text,
                  predicted_class: props.predicted_class,
                  correct_class: 'neutral',
                })
              }
              color='yellow'
              size='lg'
            >
              <RiEmotionNormalFill size={24} />
            </Button>
          </Container>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Flex direction='column'>{renderButtons()}</Flex>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title='Thank you for the feedback!'
      >
        <p>Your feedback has been submitted successfully.</p>
      </Modal>
    </>
  );
};
