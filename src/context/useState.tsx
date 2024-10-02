import { useState } from "react";

// export type SideBarContent = {
// };

type State = {
  loading: true;
  page?: string;
  // sideBarContent?: SideBarContent;
};

type LoadedState = {
  loading: false;
  page: string;
  // sideBarContent: SideBarContent;
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
      // sideBarContent: { stocks: [] },
    });
  };

  return {
    state,
    setPage,
    onLoad,
  };
}
