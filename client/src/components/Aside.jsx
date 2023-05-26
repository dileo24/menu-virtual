import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Aside() {
  // Cambiar background de los botones, dependiendo la página que se esté mostrando
  useEffect(() => {
    // Obtener el último atributo de la URL
    var url = window.location.href;
    var urlSplit = url.split("/");
    var ultimoAtributo = urlSplit[urlSplit.length - 1];
    // Obtener los botones
    const platillos = document.querySelector(".platillos");
    const nuevoPlatillo = document.querySelector(".nuevoPlatillo");
    // Condición según el último atributo del url
    if (ultimoAtributo === "nuevoPlatillo") {
      nuevoPlatillo.classList.add("bg-teal-700");
    } else if (ultimoAtributo === "") {
      platillos.classList.add("bg-teal-700");
    }
  }, []);

  return (
    <aside className="md:w-2/5 lg:w-2/5 xl:w-1/5 bg-teal-600 px-5 py-10">
      <h1 className="uppercase text-white tracking-wide text-2xl  font-bold mt-2">
        Menú - json local
      </h1>
      <p className="mt-10 text-white">
        Administra tus Platillos con el Menú Virtual
      </p>
      <nav className="mt-8">
        <Link
          to="/"
          className="platillos px-3 py-1 text-white block hover:bg-teal-900 hover:text-yellow-400"
        >
          Menú
        </Link>
        <Link
          to="/nuevoPlatillo"
          className="nuevoPlatillo px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400"
        >
          Nuevo Platillo
        </Link>
      </nav>
    </aside>
  );
}
