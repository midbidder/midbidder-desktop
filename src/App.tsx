import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar, { SiteMapping } from "./components/NavBar";
import Home from "./pages/Home";
import Tutorial from "./pages/Tutorial";

export const siteMap: SiteMapping[] = [
  {
    title: "home",
    route: "/",
    component: <Home />,
    exact: true,
  },
  {
    title: "tutorial",
    route: "/tutorial",
    component: <Tutorial />,
  },
];

export default function App() {
  return (
    <div>
      <NavBar title={"midbidder"} siteMap={siteMap} />
      <div>
        <Router>
          {siteMap.map((value: SiteMapping) => (
            <Route exact={value.exact} path={value.route}>
              {value.component}
            </Route>
          ))}
        </Router>
      </div>
    </div>
  );
}
