import React from "react";
import * as FooterStyle from "./Footer.module.css";

function Footer() {
  return (
    <div className={`${FooterStyle.footer}`}>
      <footer className={`${FooterStyle.bottom}`}>
        <div className="container">
          <div className="container">Footer</div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
