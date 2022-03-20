import "./header.css";
import React from "react";
const Header: React.FC = () => {
  return (
    <div className="Header">
      <div className="center">
        JSBook
        <span className="icon center">
          <a
            href="https://github.com/BrainyZombie/JsBook"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github"> </i>
          </a>
        </span>
      </div>
    </div>
  );
};

export default Header;
