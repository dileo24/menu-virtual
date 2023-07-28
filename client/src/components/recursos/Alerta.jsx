import React from "react";

export default function Alerta({
  tipo,
  titulo,
  texto,
  estado,
  setEstado,
  callback,
}) {
  const claseAlerta =
    tipo === "pregunta"
      ? "pregunta"
      : tipo === "error"
      ? "error"
      : tipo === "exito"
      ? "exito"
      : "";

  const handleClick = () => {
    callback();
    setEstado(false);
  };

  return (
    estado && (
      <div className="fondoAlerta">
        <div className={claseAlerta}>
          <p className="titulo">{titulo}</p>
          <p className="texto">{texto}</p>
          {tipo === "pregunta" ? (
            <div className="btnCont">
              <button className="aceptar" onClick={() => handleClick()}>
                Aceptar
              </button>
              <button className="cancelar" onClick={() => setEstado(false)}>
                Cancelar
              </button>
            </div>
          ) : (
            <div className="btnCont">
              <button className="aceptarSolo" onClick={() => handleClick()}>
                Aceptar
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
}
