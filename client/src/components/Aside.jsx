import React /* useState  */ from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cleanUserActual } from "../redux/actions";
/* import ModalLogin from "./ModalLogin"; */

export default function Aside() {
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

  // Cambiar background de los botones, dependiendo la página que se esté mostrando
  useEffect(() => {
    // Obtener el último atributo de la URL
    var url = window.location.href;
    var urlSplit = url.split("/");
    var ultimoAtributo = urlSplit[urlSplit.length - 1];
    // Obtener los botones
    const productos = document.querySelector(".productos");
    const nuevoProducto = document.querySelector(".nuevoProducto");
    // Condición según el último atributo del url
    if (ultimoAtributo === "nuevoProducto") {
      nuevoProducto.classList.add("bg-teal-700");
    } else if (ultimoAtributo === "") {
      productos.classList.add("bg-teal-700");
    }
  }, []);

  return (
    <aside className="md:w-2/5 lg:w-2/5 xl:w-1/5 bg-teal-600 px-5 py-10">
      <h1 className="uppercase text-white tracking-wide text-2xl font-bold mt-2">
        Menú Virtual
      </h1>
      {userActual?.data?.nombre && (
        <h1 className="uppercase text-white tracking-wide text-2xl font-bold mt-2">
          Bienvenido {userActual.data.nombre}
        </h1>
      )}
      <p className="mt-10 text-white">Administra tus productos</p>
      <nav className="mt-8">
        <Link
          to="/"
          className="productos px-3 py-1 text-white block hover:bg-teal-900 hover:text-yellow-400"
        >
          Menú
        </Link>
        <Link
          to="/nuevoProducto"
          className="nuevoProducto px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400"
        >
          Nuevo producto
        </Link>

        <Link
          to="/login"
          className="nuevoProducto px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400"
        >
          Iniciar Sesión
        </Link>
        <button
          onClick={cerrarSesion}
          className="nuevoProducto px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400"
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}
