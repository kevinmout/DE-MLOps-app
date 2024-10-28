import { Button } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

interface Props {
  onClick: () => void;
  loading?: boolean;
}

export const RefreshButton = (props: Props): JSX.Element => {
  return (
    <Button
      leftIcon={<IconRefresh />}
      onClick={props.onClick}
      loading={props.loading}
    >
      Sentiment Analysis Model
    </Button>
  );
};
