import React from "react";
import { AppBar, Toolbar, Tabs, Tab } from "@material-ui/core";

export interface SiteMapping {
    title: string;
    route: string;
};

export interface NavBarProps {
    siteMap: SiteMapping[],
    title: string,
};

export default function NavBar(props: NavBarProps) {
  return (
    <AppBar position="sticky">
      <Toolbar>
          <Tabs>
              {
                  props.siteMap.map(
                      (siteMap: SiteMapping) => <Tab label={siteMap.title}/>
                  )
              }
          </Tabs>
      </Toolbar>
    </AppBar>
  );
}
