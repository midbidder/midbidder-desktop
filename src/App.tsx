import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar, { SiteMapping } from "./components/NavBar";
import Home from "./pages/Home";

export const siteMap: SiteMapping[] = [
  {
    title: "home",
    route: "/",
  },
  {
    title: "tutorial",
    route: "/tutorial",
  },
];

export default function App() {
  return (
    <div>
      <NavBar title={"midbidder"} siteMap={siteMap} />
      <div>
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
        </Router>
      </div>
    </div>
  );
}
