import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function ModalRegister({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    email: "",
    clave: "",
    rolID: "3",
  });

  const handlerChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      register({
        email: input.email,
        clave: input.clave,
        nombre: input.nombre,
        apellido: input.apellido,
        rolID: "3",
      })
    );

    navigate("/");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {/* <span className="close" onClick={onClose}>
          &times;
        </span> */}
        <h2>Registro de usuarios</h2>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input
                type="text"
                name="nombre"
                value={input.nombre}
                onChange={(e) => handlerChange(e)}
                autoFocus
              />
            </label>
            <label>
              Apellido:
              <input
                type="text"
                name="apellido"
                value={input.apellido}
                onChange={(e) => handlerChange(e)}
                autoFocus
              />
            </label>
            <label>
              Correo electrónico:
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={(e) => handlerChange(e)}
                required
              />
            </label>
            <label>
              Contraseña:
              <input
                type="password"
                name="clave"
                value={input.clave}
                onChange={(e) => handlerChange(e)}
                required
              />
            </label>
            <div className="modal-footer">
              <button type="submit">Registrarse</button>
              <button type="button" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
