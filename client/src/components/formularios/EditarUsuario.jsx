import React, { useState, useEffect } from "react";
import { getUsuarios, desbloqueoUsuario } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import { mostrarAlerta, ningunInputVacio } from "../../helpers";
import HeaderBack from "../recursos/HeaderBack";
import { Link, useNavigate, useParams } from "react-router-dom";
/* import { VscTrash } from "react-icons/vsc"; */
import Alerta from "../recursos/Alerta";

export default function EditarUsuario() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userActual.tokenSession);
  const usuarios = useSelector((state) => state.usuarios);
  const emails = usuarios && usuarios.map((user) => user.email);
  const [showPassword, setShowPassword] = useState(false);
  const [editarContra, setEditarContra] = useState(false);
  let email;
  let { id } = useParams();
  const user = usuarios.find((user) => user.id === Number(id));
  const navigate = useNavigate();
  const [alertaExito, setAlertaExito] = useState(false);

  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    email: "",
    clave: "",
    rolID: "",
  });

  useEffect(() => {
    if (user) {
      setInput({
        nombre: user ? user.nombre : "",
        apellido: user ? user.apellido : "",
        email: user ? user.email : "",
        clave: user ? "" : "",
        rolID: user ? user.Rol.id.toString() : "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    validateEmail(input.email.valueOf());
    if (input.clave.length < 8 && editarContra) {
      return mostrarAlerta(
        "La contraseña debe tener al menos 8 caracteres",
        "error"
      );
    } else if (!email) {
      return mostrarAlerta("Formato del email inválido", "error");
    }
    // mostrarAlerta("Usuario acutualizado con con éxito", "exito");

    dispatch(desbloqueoUsuario(input, id, token));

    // Reiniciar los campos del formulario
    setInput({
      nombre: "",
      apellido: "",
      email: "",
      clave: "",
      rolID: "",
    });
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
    } else {
      email = true;
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
        title={`Editar`}
        span={"Usuario"}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setAlertaExito({
            estado: true,
            texto: "Usuario actualizado con éxito",
          });
          handleSubmit();
        }}
        className="formulario contenedor"
      >
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
          {!editarContra && (
            <button onClick={() => setEditarContra(true)} className="btnContra">
              Editar contraseña
            </button>
          )}
          {editarContra && (
            <>
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
            </>
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
          <Link to={"/usuarios"} className="botonDescartar">
            {/* <VscTrash className="eliminarIcon" /> */} Descartar cambios
          </Link>
          <button type="submit" className="botonFooter">
            Guardar cambios
          </button>
        </div>
      </form>
      {alertaExito && (
        <Alerta
          tipo={"exito"}
          titulo={"Éxito"}
          texto={alertaExito.texto}
          estado={alertaExito}
          setEstado={setAlertaExito}
          callback={() => navigate("/usuarios")}
        />
      )}
    </div>
  );
}
