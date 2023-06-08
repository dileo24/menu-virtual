import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cleanUserActual } from "../../redux/actions";

export default function Aside() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActual = useSelector((state) => state.userActual);

  const cerrarSesion = () => {
    let res = window.confirm(`Está seguro de querer cerrar su sesión?`);
    if (res === true) {
      /*  localStorage.clear(); */
      dispatch(cleanUserActual(userActual.data.id));
    }
    navigate("/");
  };

  return (
    <aside className="md:w-1/5 lg:w-1/5 xl:w-1/5 bg-teal-600 px-5 py-10">
      <h1 className="uppercase text-white tracking-wide text-2xl font-bold mt-2">
        Menú Virtual
      </h1>
      {userActual?.data?.nombre && (
        <h1 className="uppercase text-white tracking-wide text-2xl font-bold mt-2">
          Bienvenido {userActual.data.nombre}
        </h1>
      )}
      {/* <p className="mt-10 text-white">Administra tus productos</p> */}
      <nav className="mt-8">
        <Link
          to="/"
          className="productos px-3 py-1 text-white block hover:bg-teal-900 hover:text-yellow-400"
        >
          Menú
        </Link>
        {userActual &&
        // 1 superAdmin / 2 admin
        (userActual.data.RolId === 1 || userActual.data.RolId === 2) ? (
          <>
            <Link
              to="/nuevoProducto"
              className="nuevoProducto px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400"
            >
              Nuevo producto
            </Link>
            <Link
              to="/pedidos"
              className="pedidos px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400"
            >
              Pedidos
            </Link>
          </>
        ) : null}
        {userActual && userActual.data.RolId === 1 && (
          <>
            <Link
              to="/register"
              className="registrar px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400"
            >
              Crear cuenta para empleado
            </Link>
            <Link
              to="/usuarios"
              className="administrar px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400"
            >
              Administrar usuarios
            </Link>
            <Link
              to="/estadisticas"
              className="estadisticas px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400"
            >
              Estadisticas
            </Link>
          </>
        )}
        {!userActual ? (
          <Link
            to="/login"
            className="iniciarSesion px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400"
          >
            Iniciar Sesión
          </Link>
        ) : (
          <button
            onClick={cerrarSesion}
            className="cerrarSesion px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400"
          >
            Cerrar sesión
          </button>
        )}
      </nav>
    </aside>
  );
}
