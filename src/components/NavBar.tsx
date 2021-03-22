import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { AuthContext, AuthSchema } from "../contexts/AuthContext";
import { blue, purple, black } from "../styles/GlobalStyles";
import { BodyText, TitleText } from "./Text";
export interface SiteMapping {
  title: string;
  route: string | false;
  component: any;
  exact?: boolean;
  tab: boolean;
}

export interface NavBarProps {
  siteMap: Map<string, SiteMapping>;
}

export default function NavBar(props: NavBarProps) {
  const auth: AuthSchema = useContext(AuthContext);
  const signedIn: boolean = auth.signedIn;
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
          {signedIn ? (
            <Button
              style={{
                textTransform: "none",
                backgroundColor: blue,
                color: "#fff",
              }}
              onClick={() => {
                auth.signOut && auth.signOut();
              }}
              href={"/signout"}
            >
              <BodyText>sign out</BodyText>
            </Button>
          ) : (
            <>
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
            </>
          )}
          {Array.from(props.siteMap.values()).map((mapping: SiteMapping) =>
            mapping.tab ? (
              <Button
                style={{
                  textTransform: "none",
                  backgroundColor: purple,
                  color: black,
                }}
                href={mapping.route || "/"}
              >
                <BodyText>{mapping.title}</BodyText>
              </Button>
            ) : undefined
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
