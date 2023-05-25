import React from "react";

export default function Aside() {
  return (
    <aside class="md:w-2/5 lg:w-2/5 xl:w-1/5 bg-teal-600 px-5 py-10">
      <h1 class="uppercase text-white tracking-wide text-2xl  font-bold mt-2">
        Menú - json local
      </h1>
      <p class="mt-10 text-white">
        Administra tus Platillos con el Menú Virtual
      </p>
      <nav class="mt-8">
        <a
          href="#"
          class="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400 bg-teal-700"
        >
          Menú
        </a>
        <a
          href="nuevo-platillo.html"
          class="px-3 py-1 text-white block hover:bg-teal-900 mt-2 hover:text-yellow-400"
        >
          Nuevo Platillo
        </a>
      </nav>
    </aside>
  );
}
