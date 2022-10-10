import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="section section-header">
      <Link to={'/'}>
        <div className="section-header__logo"></div>
      </Link>
    </header>
  );
}

export default Header;
