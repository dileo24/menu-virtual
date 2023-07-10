import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserActual, getUsuarios } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import { mostrarAlerta } from "../../helpers";
import { GrCircleAlert } from "react-icons/gr";

export default function ModalLogin({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  const [input, setInput] = useState({
    email: "",
    clave: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userEmail = usuarios.find((user) => user.email === input.email);

    if (userEmail) {
      dispatch(getUserActual({ email: input.email, clave: input.clave }))
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          mostrarAlerta("Contraseña incorrecta. Pruebe de nuevo", "error");
        });
    } else {
      mostrarAlerta("Este email no se encuentra registrado.", "error");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="loginContainer">
      <div className="header1">
        <Link to="/" className="ocultarBtn">
          <span className="arrow-left"></span>
        </Link>
      </div>
      <h1 className="">QuickBites</h1>
      <div className="cardContainer">
        <div className="cardLogin">
          <form onSubmit={handleSubmit} className="formLogin">
            <div className="email">
              <label className="emailLabel" htmlFor="email">
                Correo electrónico
              </label>
              <input
                className="emailInput"
                type="email"
                name="email"
                placeholder="Escribe tu email"
                value={input.email}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="clave">
              <label className="claveLabel" htmlFor="clave">
                Contraseña
              </label>
              <input
                className="claveInput"
                type={showPassword ? "text" : "password"}
                name="clave"
                placeholder="Escribe tu contraseña"
                value={input.clave}
                onChange={(e) => handleChange(e)}
                required
              />
              {showPassword ? (
                <RiEyeOffLine
                  className="ojoCerrado"
                  onClick={handleShowPassword}
                />
              ) : (
                <RiEyeLine
                  className="ojoAbierto"
                  onClick={handleShowPassword}
                />
              )}
            </div>
            <button type="submit" className="submitBtn">
              Iniciar Sesión
            </button>
          </form>
          <div className="aviso">
            <GrCircleAlert className="avisoIcon"></GrCircleAlert>
            <p>Solo para uso administrativo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
