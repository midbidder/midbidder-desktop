import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar, { SiteMapping } from "./components/NavBar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Tutorial from "./pages/Tutorial";
import { SignIn, SignUp } from "./pages/SignIn";
import {
  AuthContext,
  AuthContextSignedIn,
  AuthContextSignedOut,
  AuthSchema,
} from "./contexts/AuthContext";
import Play from "./pages/Play";

const mapEntries: [string, SiteMapping][] = [
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
  {
    title: "signin",
    route: "/signin",
    component: <SignIn />,
    tab: false,
  },
  {
    title: "signup",
    route: "/signup",
    component: <SignUp />,
    tab: false,
  },
].map((mapEntry) => [mapEntry.title, mapEntry]);

export const siteMap: Map<string, SiteMapping> = new Map(mapEntries);

export default function App() {
  const cookiesSignedIn: boolean = localStorage.getItem("loggedIn") === "true";
  const [authState, setAuthState] = useState(
    cookiesSignedIn ? AuthContextSignedIn : AuthContextSignedOut
  );
  const authSignOut = () => {
    localStorage.clear();
    setAuthState(AuthContextSignedOut);
  };
  const authSignIn = () => {
    localStorage.setItem("loggedIn", "true");
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
  // Signed In
  const signedIn = authState.signedIn;
  // sign in only enabled when logged off

  // Settings only enabled when logged in
  const settingsConfig = siteMap.get("settings")!;
  settingsConfig.tab = signedIn;
  if (!signedIn) {
    settingsConfig.route = false;
  }
  siteMap.set("settings", settingsConfig);

  return (
    <div>
      <AuthContext.Provider value={authState}>
        <NavBar siteMap={siteMap} />
        <div>
          <Router>
            {Array.from(siteMap.values()).map(
              (value: SiteMapping, index: number) =>
                value.route === false ? undefined : (
                  <Route
                    key={`${index}-route-comp`}
                    exact={value.exact}
                    path={value.route}
                  >
                    {value.component}
                  </Route>
                )
            )}
          </Router>
        </div>
      </AuthContext.Provider>
    </div>
  );
}
