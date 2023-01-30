import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-10vh ">
      <Header />

      <div className=" min-h-73vh">{children}</div>
      <Footer className=" min-h-10vh " />
    </div>
  );
};

export default Layout;
