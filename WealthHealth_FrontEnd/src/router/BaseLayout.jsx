import React from "react";
import Nav from "../components/baselayout/Nav";
import { Outlet } from "react-router-dom";

function BaseLayout() {
    return (
      <>
        <Nav />
        <Outlet />
      </>
    );
  }
  export default BaseLayout;