import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cleanUserActual } from "../../redux/actions";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActual = useSelector((state) => state.userActual);

  const cerrarSesion = () => {
    let res = window.confirm(`Está seguro de querer cerrar su sesión?`);
    if (res === true) {
      dispatch(cleanUserActual(userActual.data.id));
    }
    navigate("/");
  };

  return (
    <header id="containerHeader" className="containerHeader">
      <h1>QuickBites</h1>
      <div id="subHeader" className="subHeader">
        <nav id="nav" className="nav">
          <Link to="/" className="menu">
            Menú
          </Link>
          {userActual &&
          // 1 superAdmin / 2 admin
          (userActual.data.RolId === 1 || userActual.data.RolId === 2) ? (
            <>
              <Link to="/nuevoProducto" className="nuevoProducto">
                Nuevo producto
              </Link>
              <Link to="/pedidos" className="pedidos">
                Pedidos
              </Link>
            </>
          ) : null}
          {userActual && userActual.data.RolId === 1 && (
            <>
              <Link to="/register" className="registrar">
                Crear cuenta para empleado
              </Link>
              <Link to="/usuarios" className="administrar">
                Administrar usuarios
              </Link>
              <Link to="/estadisticas" className="estadisticas">
                Estadisticas
              </Link>
            </>
          )}
          {!userActual ? (
            <>
              <Link to="/carrito" className="carrito">
                Carrito
              </Link>
              {/* <Link to="/historial" className="historial">
                Historial de Pedidos
              </Link> */}
              <Link to="/login" className="iniciarSesion">
                Iniciar Sesión
              </Link>
            </>
          ) : (
            <button onClick={cerrarSesion} className="cerrarSesion">
              Cerrar sesión
            </button>
          )}
        </nav>
        <div id="categorias" className="categorias">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat in
          officiis accusamus incidunt quisquam aliquid adipisci voluptates Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Veniam nemo rem
          sunt culpa quae veritatis quos! Autem odio voluptatem, sint
          consectetur impedit eligendi quasi rem fuga qui est cum nihil.
        </div>
      </div>
    </header>
  );
}
