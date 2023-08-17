import React from "react";
import { Link, useLocation } from "react-router-dom";

function HeaderBack({ url, arrowType, title, span, setHacerPedido }) {
  const location = useLocation();
  const urlSegments = location.pathname.split("/");
  const lastSegment = urlSegments[urlSegments.length - 1];
  const vertical = window.innerHeight > window.innerWidth;
  return (
    <header className={vertical ? "header1" : "headerBackPC"}>
      {vertical ? (
        <Link className="ocultarBtn" to={url}>
          <span
            className={`${arrowType === "left" ? "arrow-left" : "arrow-down"}`}
          ></span>
        </Link>
      ) : (
        <button className="ocultarBtn" onClick={() => setHacerPedido(false)}>
          <span
            className={`${arrowType === "left" ? "arrow-left" : "arrow-down"}`}
          ></span>
        </button>
      )}

      <div className="titulo">
        <h1 className="title">
          {title} <span>{span}</span>
        </h1>
      </div>
    </header>
  );
}

export default HeaderBack;
