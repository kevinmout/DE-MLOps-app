import { useContext, useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Image,
} from "@mantine/core";
import { Icon as TablerIcon, IconHome2 } from "@tabler/icons-react";
import { DarkLightButton } from "./DarkLightButton";
import { DataContext } from "../../../context/provider/DataProvider";

const useStyles = createStyles((theme) => ({
  link: {
    width: 70,
    height: 70,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
  to: string;
  setPage(page: string): void;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  setPage,
  to,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right">
      <UnstyledButton
        onClick={() => {
          setPage(to);
          if (onClick) onClick();
        }}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [{ icon: IconHome2, label: "Home", to: "home" }];

export const NavbarComponent = () => {
  const { setPage } = useContext(DataContext);

  const [active, setActive] = useState(0);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
      setPage={setPage}
      to={link.to}
    />
  ));

  return (
    <Navbar width={{ base: 100 }} p="md">
      <Center>
        <Image
          src={"./images/monopoly-man.png"}
          alt="loading"
          style={{ borderRadius: "50%" }}
        />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <DarkLightButton />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};
