import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserActual, getUsuarios, searchXname } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import { mostrarAlerta } from "../../helpers";
import { GrCircleAlert } from "react-icons/gr";
import HeaderBack from "../recursos/HeaderBack";

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
          dispatch(searchXname(""));
          switch (userEmail.Rol.id) {
            case 3:
              navigate("/pedidos");
              break;

            default:
              navigate("/");
          }
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

  const vertical = window.innerHeight > window.innerWidth;
  const loginContainerMobile = document.querySelector(".loginContainerMobile");
  if (loginContainerMobile) {
    loginContainerMobile.style.height = `${window.innerHeight}px`;
  }
  const loginContainerPC = document.querySelector(".loginContainerPC");
  if (loginContainerPC) {
    loginContainerPC.style.height = `${window.innerHeight}px`;
  }

  return (
    <div className={vertical ? "loginContainerMobile" : "loginContainerPC"}>
      <HeaderBack url={"/"} arrowType={"left"} title={``} />
      <div className="marcaCardCont">
        <h1 className="">QuickBites</h1>
        <div className="cardContainer contenedor">
          <div className="cardLogin ">
            <form onSubmit={handleSubmit} className="formLogin">
              <div className="email">
                <label className="emailLabel" htmlFor="email">
                  Correo electrónico
                </label>
                <input
                  id="email"
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
                  id="clave"
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
              <button
                type="submit"
                className="submitBtn"
                name="submit"
                id="submit"
              >
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
    </div>
  );
}
