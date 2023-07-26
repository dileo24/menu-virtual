import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsuarios, register } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import { mostrarAlerta, ningunInputVacio } from "../../helpers";
import HeaderBack from "../recursos/HeaderBack";

export default function ModalRegister({ onClose }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userActual.tokenSession);
  const usuarios = useSelector((state) => state.usuarios);
  const emails = usuarios && usuarios.map((user) => user.email);
  const [showPassword, setShowPassword] = useState(false);
  let email;

  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    email: "",
    clave: "",
    rolID: "2",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(input.email.valueOf());
    if (input.clave.length < 8) {
      return mostrarAlerta(
        "La contraseña debe tener al menos 8 caracteres",
        "error"
      );
    } else if (emails && emails.includes(input.email)) {
      return mostrarAlerta("El email ingresado ya existe", "error");
    } else if (!ningunInputVacio(input)) {
      return mostrarAlerta("Error: Hay algún campo vacío", "error");
    } else if (!email) {
      return mostrarAlerta("Formato del email inválido", "error");
    }
    mostrarAlerta("Cuenta creada con éxito", "exito");
    dispatch(register(input, token));
    console.log(token);

    // Reiniciar los campos del formulario
    setInput({
      nombre: "",
      apellido: "",
      email: "",
      clave: "",
    });

    /*  window.location.reload(); */
    // navigate("/");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  // Función de validación de email
  const validateEmail = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(e)) {
      email = false;
      console.log(email);
    } else {
      email = true;
      console.log(email);
    }
  };

  return (
    <div className="registerContainer">
      <HeaderBack
        url={"/usuarios"}
        arrowType={"left"}
        title={`Crear Usuario`}
      />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Escribe su nombre"
            value={input.nombre}
            onChange={(e) => handleChange(e)}
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            name="apellido"
            placeholder="Escribe su apellido"
            value={input.apellido}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            placeholder="Escribe su email"
            value={input.email}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label htmlFor="clave">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            name="clave"
            placeholder="Escribe su contraseña"
            value={input.clave}
            min={8}
            onChange={(e) => handleChange(e)}
          />
          {showPassword ? (
            <RiEyeOffLine className="" onClick={handleShowPassword} />
          ) : (
            <RiEyeLine className="" onClick={handleShowPassword} />
          )}
        </div>

        <div>
          <button type="submit">Crear cuenta para empleado</button>
          <Link to="/">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
