import { useContext } from "react";
import { AppShellComponent } from "../components/Appshell/AppShellComponent";
import { HomePage } from "./Home/HomePage";
import { DataContext } from "../context/provider/DataProvider";

export const IndexProvider = () => {
  return <FetchInitialData />;
};

const FetchInitialData = (): JSX.Element => {
  return <IndexPage />;
};

const IndexPage = (): JSX.Element => {
  const { page } = useContext(DataContext);
  function render() {
    switch (page) {
      case "home":
        return <HomePage />;
      default:
        return <HomePage />;
    }
  }

  return <AppShellComponent>{render()}</AppShellComponent>;
};
