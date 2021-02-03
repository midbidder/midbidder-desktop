import React, { useContext } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
export interface SiteMapping {
  title: string;
  route: string;
  component: any;
  exact?: boolean;
  tab: boolean;
}

export interface NavBarProps {
  siteMap: SiteMapping[];
  title: string;
}

export default function NavBar(props: NavBarProps) {
  const auth = useContext(AuthContext);
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">{props.title}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          {props.siteMap
            .filter((tabSetting: SiteMapping) => tabSetting.tab)
            .map((tabSetting: SiteMapping) => (
              <Nav.Link href={tabSetting.route}>{tabSetting.title}</Nav.Link>
            ))}
          <NavDropdown title="profile" id="basic-nav-dropdown">
            <NavDropdown.Item href="/settings">
              <Nav.Link href="/settings">settings</Nav.Link>
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item href="/signin">
              sign in
            </NavDropdown.Item>
            <NavDropdown.Item href="/signup">
              sign up
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
