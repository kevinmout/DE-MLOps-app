import { AppShell, useMantineTheme } from "@mantine/core";
import { NavbarComponent } from "./components/NavbarComponent";

interface Props {
  children: JSX.Element;
}

export const AppShellComponent = (props: Props) => {
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavbarComponent />}
    >
      {props.children}
    </AppShell>
  );
};
