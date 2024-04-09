import React from "react";
import Footer from "./components/Footer";
import Nav from "./components/Navbar";
import NavOut from "./components/NavbarLoggedOut";

const Layout = ({ children }) => {
  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  // Memoize the navigation components
  const MemoizedNav = React.memo(Nav);
  const MemoizedNavOut = React.memo(NavOut);

  return (
    <div>
      {isAuthenticated ? <MemoizedNav /> : <MemoizedNavOut />}{" "}
      {/* Conditionally render the navbar */}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;