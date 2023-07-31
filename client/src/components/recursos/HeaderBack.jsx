import React from "react";
import { Link } from "react-router-dom";

function HeaderBack({ url, arrowType, title }) {
  return (
    <header className="header1">
      <Link className="ocultarBtn" to={url}>
        <span
          className={`${arrowType === "left" ? "arrow-left" : "arrow-down"}`}
        ></span>
      </Link>
      <h1 className="title">
        {title}
        <span> Realizados</span>
      </h1>
    </header>
  );
}

export default HeaderBack;
