import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { cleanUserActual } from "../../redux/actions";
import Filtros from "../recursos/Filtros";
import { GiShoppingCart } from "react-icons/gi";
import { HiUserCircle } from "react-icons/hi";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActual = useSelector((state) => state.userActual);
  const categorias = useSelector((state) => state.categorias);

  const cerrarSesion = () => {
    let res = window.confirm(`Está seguro de querer cerrar su sesión?`);
    if (res === true) {
      dispatch(cleanUserActual(userActual.data.id));
    }
    navigate("/");
  };

  return (
    <header id="containerHeader" className="containerHeader">
      <NavLink to="/">
        <h1>QuickBites</h1>
      </NavLink>
      <div id="subHeader" className="subHeader">
        <nav id="nav" className="nav">
          {userActual &&
            (userActual.data.RolId === 3 || userActual.data.RolId === 2) && (
              <Link to="/pedidos" className="pedidos">
                Pedidos
              </Link>
            )}
          {userActual && userActual.data.RolId === 1 && (
            <>
              <Link to="/nuevoProducto" className="nuevoProducto">
                Nuevo producto
              </Link>
              <Link to="/nuevaCateg" className="nuevaCateg">
                Nueva categoria
              </Link>
              <Link to="/pedidos" className="pedidos">
                Pedidos
              </Link>
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
              <Link to="/login" className="iniciarSesion">
                <HiUserCircle className="usuarioIcon" />
              </Link>
              <Filtros />
              <Link to="/carrito" className="carrito">
                <GiShoppingCart className="carritoIcon" />
              </Link>
            </>
          ) : (
            <button onClick={cerrarSesion} className="cerrarSesion">
              Cerrar sesión
            </button>
          )}
        </nav>
        <div id="categorias" className="categorias px-5">
          {categorias &&
            categorias.map((categ) => (
              <div key={categ.id} className="categoria">
                {categ.nombre}
              </div>
            ))}
        </div>
      </div>
    </header>
  );
}
