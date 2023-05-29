import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserActual } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function ModalLogin({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    clave: "",
  });

  const handlerChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUserActual({ email: input.email, clave: input.clave }));

    navigate("/");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {/* <span className="close" onClick={onClose}>
          &times;
        </span> */}
        <h2>Iniciar Sesión</h2>
        <div className="form">
          <form onSubmit={handleSubmit}>
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
              <button type="submit">Iniciar Sesión</button>
              <Link to="/">
                <button type="button" onClick={onClose}>
                  Cancelar
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
