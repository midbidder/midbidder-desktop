import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

export interface SiteMapping {
  title: string;
  route: string;
}

export interface NavBarProps {
  siteMap: SiteMapping[];
  title: string;
}

export default function NavBar(props: NavBarProps) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">{props.title}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end"
          }}
        >
          {props.siteMap.map((tabSetting: SiteMapping) => (
            <Nav.Link href={tabSetting.route}>
              {tabSetting.title}
            </Nav.Link>
          ))}
          <NavDropdown
            title="profile"
            id="basic-nav-dropdown"
          >
            <Nav.Link href={"/settings"}>settings</Nav.Link>

            <NavDropdown.Divider />
            <NavDropdown.Item>sign out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
