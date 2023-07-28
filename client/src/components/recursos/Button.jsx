import React from "react";

function Button({ signo, funcion }) {
  return (
    <button className="contador" type="button" onClick={funcion}>
      {signo === "-" && <div className="signoMenos"></div>}
      {signo === "+" && (
        <div className="signoMas1">
          <div className="signoMas2"></div>
        </div>
      )}
    </button>
  );
}

export default Button;
