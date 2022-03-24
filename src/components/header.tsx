import "./header.css";
import React from "react";
const Header: React.FC = () => {
  return (
    <pre className="Header">
      <a
        href="https://github.com/BrainyZombie/JsBook"
        target="_blank"
        rel="noreferrer"
      >
        <div className="center">
          JSBook
          <span className="icon center">
            <i className="fab fa-github"> </i>
          </span>
        </div>
      </a>
    </pre>
  );
};

export default Header;
