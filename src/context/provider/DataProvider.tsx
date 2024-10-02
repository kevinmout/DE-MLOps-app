import { createContext } from "react";
import { useDataState } from "../useState";
import { LoadingOverlay } from "@mantine/core";

interface Props {
  children: JSX.Element;
}

type Context = {
  page: string;

  setPage: (page: string) => void;
};

export const DataContext = createContext<Context>({} as Context);

export const DataProvider = ({ children }: Props) => {
  const { state, setPage } = useDataState();

  if (state.loading) {
    return (
      <LoadingOverlay
        visible={true}
        loaderProps={{ size: "xl", variant: "bars" }}
      ></LoadingOverlay>
    );
  }
  const { page } = state;
  return (
    <DataContext.Provider
      value={{
        page: page,
        setPage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
