import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar, { SiteMapping } from "./components/NavBar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Tutorial from "./pages/Tutorial";
import {
  AuthContext,
  AuthContextSignedIn,
  AuthContextSignedOut,
  AuthSchema,
} from "./contexts/AuthContext";
import Play from "./pages/Play";

export const siteMap: SiteMapping[] = [
  {
    title: "home",
    route: "/",
    component: <Home />,
    exact: true,
    tab: true,
  },
  {
    title: "tutorial",
    route: "/tutorial",
    component: <Tutorial />,
    tab: true,
  },
  {
    title: "settings",
    route: "/settings",
    component: <Settings />,
    tab: false,
  },
  {
    title: "play",
    route: "/play",
    component: <Play />,
    tab: false,
  },
];

export default function App() {
  const [authState, setAuthState] = useState(AuthContextSignedOut);
  const authSignOut = () => {
    setAuthState(AuthContextSignedOut);
  };
  const authSignIn = () => {
    setAuthState(AuthContextSignedIn);
  };
  if (!authState.signOut) {
    const defaultAuthState: AuthSchema = {
      signedIn: authState.signedIn,
      signOut: authSignOut,
      signIn: authSignIn,
    };
    setAuthState(defaultAuthState);
  }
  return (
    <div>
      <AuthContext.Provider value={authState}>
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
      </AuthContext.Provider>
    </div>
  );
}
