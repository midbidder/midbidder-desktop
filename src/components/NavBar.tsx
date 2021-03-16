import { Button } from "@material-ui/core";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { blue, purple, black } from "../styles/GlobalStyles";
import { BodyText, TitleText } from "./Text";
export interface SiteMapping {
  title: string;
  route: string;
  component: any;
  exact?: boolean;
  tab: boolean;
}

export interface NavBarProps {
  siteMap: SiteMapping[];
}

export default function NavBar(props: NavBarProps) {
  // TODO: const auth = useContext(AuthContext);
  return (
    <Navbar style={{ backgroundColor: purple }} expand="lg">
      <Navbar.Brand href="/">
        <TitleText size="m">midb</TitleText>
        <TitleText size="m" color={blue}>
          i
        </TitleText>
        <TitleText size="m">dder</TitleText>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Button
            style={{
              textTransform: "none",
              backgroundColor: blue,
              color: "#fff",
            }}
            href={"/signup"}
          >
            <BodyText>sign up</BodyText>
          </Button>
          <div style={{ width: 10, height: 10 }} />
          <Button
            style={{
              textTransform: "none",
              color: blue,
              border: `1px solid ${blue}`,
              backgroundColor: "transparent",
            }}
            href={"/signin"}
          >
            <BodyText>sign in</BodyText>
          </Button>
          {props.siteMap
            .filter((tabSetting: SiteMapping) => tabSetting.tab)
            .map((tabSetting: SiteMapping, index: number) => (
              <Button
                style={{
                  textTransform: "none",
                  backgroundColor: purple,
                  color: black,
                }}
                href={tabSetting.route}
              >
                <BodyText>{tabSetting.title}</BodyText>
              </Button>
            ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
