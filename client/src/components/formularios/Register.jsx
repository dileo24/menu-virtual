import React, { useState, useEffect } from "react";
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
    rolID: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(input.email.valueOf());
    /* if (!ningunInputVacio(input)) {
      return mostrarAlerta("Error: Hay algún campo vacío", "error"); */
    if (emails && emails.includes(input.email)) {
      return mostrarAlerta("El email ingresado ya existe", "error");
    } else if (input.clave.length < 8) {
      return mostrarAlerta(
        "La contraseña debe tener al menos 8 caracteres",
        "error"
      );
    } else if (!email) {
      return mostrarAlerta("Formato del email inválido", "error");
    }
    mostrarAlerta("Cuenta creada con éxito", "exito");
    dispatch(register(input, token));
    console.log(input);
    // Reiniciar los campos del formulario
    setInput({
      nombre: "",
      apellido: "",
      email: "",
      clave: "",
      rolID: "",
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

  const handleClick = (value) => {
    setInput({ ...input, rolID: value });
  };

  return (
    <div className="registerContainer">
      <HeaderBack
        url={"/usuarios"}
        arrowType={"left"}
        title={`Crear Usuario`}
      />
      <form onSubmit={handleSubmit} className="formulario contenedor">
        <div className="labelInput">
          <label htmlFor="nombre" className="nombre">
            Nombre
          </label>
          <input
            className="input"
            type="text"
            name="nombre"
            placeholder="Escribe el nombre"
            value={input.nombre}
            onChange={(e) => handleChange(e)}
            autoFocus
          />
        </div>

        <div className="labelInput">
          <label htmlFor="apellido">Apellido</label>
          <input
            className="input"
            type="text"
            name="apellido"
            placeholder="Escribe el apellido"
            value={input.apellido}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="labelInput">
          <label htmlFor="email">Correo electrónico</label>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Escribe el email"
            value={input.email}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="labelInput">
          <label htmlFor="clave">Contraseña</label>
          <input
            className="input"
            type={showPassword ? "text" : "password"}
            name="clave"
            placeholder="Escribe la contraseña"
            value={input.clave}
            min={8}
            onChange={(e) => handleChange(e)}
          />
          {showPassword ? (
            <RiEyeOffLine className="ojoCerrado" onClick={handleShowPassword} />
          ) : (
            <RiEyeLine className="ojoAbierto" onClick={handleShowPassword} />
          )}
        </div>

        <div className="labelInput">
          <label htmlFor="rolID">Cargo</label>
          <div className="checks">
            <div className="checkContainer" onClick={() => handleClick("3")}>
              <input
                className="check"
                type="radio"
                name="rolID"
                value="3"
                checked={input.rolID === "3"}
                onChange={(e) => handleChange(e)}
                required
              />
              <p>Empleado</p>
            </div>
            <div className="checkContainer" onClick={() => handleClick("2")}>
              <input
                className="check"
                type="radio"
                name="rolID"
                value="2"
                checked={input.rolID === "2"}
                onChange={(e) => handleChange(e)}
                required
              />
              <p>Administrador</p>
            </div>
          </div>
        </div>

        <div className="footer">
          <button type="submit" className="botonFooter">
            Crear Usuario
          </button>
        </div>
      </form>
    </div>
  );
}
