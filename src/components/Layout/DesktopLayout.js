import React from "react";

import SideMenu from "./SideMenu/SideMenu";
import { Container } from "@material-ui/core";
import './SideMenu/index.css'
import { useState } from "react";
const DesktopLayout = (props) => {
  const { children } = props;
  const [inactive, setInactive] = useState(true);

  return (
    <div>
      <SideMenu
        onCollapse={(inactive) => {
          setInactive(inactive);
        }}
      />
        <div className={`container_page ${inactive ? "inactive" : ""}`}>
          {children}
        </div>
    </div>
  );
};

export default DesktopLayout;
