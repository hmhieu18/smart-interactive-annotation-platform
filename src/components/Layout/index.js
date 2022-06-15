import React from "react";

import DesktopLayout from "./DesktopLayout";
const Layout = (props) => {
  const { children } = props;

  return <DesktopLayout>{children}</DesktopLayout>;
};

export default Layout;
