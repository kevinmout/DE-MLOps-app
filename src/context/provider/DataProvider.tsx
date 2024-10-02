import { createContext } from "react";
import { useDataState } from "../useState";
import { LoadingOverlay } from "@mantine/core";

interface Props {
  children: JSX.Element;
}

type Context = {
  page: string;
  // sideBarContent: SideBarContent;

  setPage: (page: string) => void;
  // setSideBarContentStocks: (stocks: StockPurchase[]) => void;
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
        // sideBarContent: sideBarContent,
        setPage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
