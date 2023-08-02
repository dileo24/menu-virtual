import React from "react";
import { Link, useLocation } from "react-router-dom";

function HeaderBack({ url, arrowType, title, span }) {
  const location = useLocation();
  const urlSegments = location.pathname.split("/");
  const lastSegment = urlSegments[urlSegments.length - 1];
  return (
    <header className="header1">
      <Link className="ocultarBtn" to={url}>
        <span
          className={`${arrowType === "left" ? "arrow-left" : "arrow-down"}`}
        ></span>
      </Link>
      <div className="titulo">
        <h1 className="title">
          {title} <span>{span}</span>
        </h1>
      </div>
    </header>
  );
}

export default HeaderBack;
