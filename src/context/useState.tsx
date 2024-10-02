import { useState } from "react";

type State = {
  loading: true;
  page?: string;
};

type LoadedState = {
  loading: false;
  page: string;
};

export function useDataState() {
  const [state, setState] = useState<State | LoadedState>({ loading: true });

  const setPage = (page: string) => {
    setState({ ...state, page: page });
  };

  const onLoad = async () => {
    setState({
      loading: false,
      page: "home",
    });
  };

  return {
    state,
    setPage,
    onLoad,
  };
}
