import React, { useEffect } from "react";
import Aside from "./Aside";
import { useDispatch, useSelector } from "react-redux";
import {
  bloqueoUsuario,
  deleteUsuario,
  desbloqueoUsuario,
  getUsuarios,
} from "../../redux/actions";
// import Filtros from "../recursos/Filtros";

export default function Usuarios() {
  const usuarios = useSelector((state) => state.usuarios);
  const userActual = useSelector((state) => state.userActual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsuarios());
    // Cambiarle el background del botón del Aside
    const administrar = document.querySelector(".administrar");
    administrar.classList.add("bg-teal-700");
  }, [dispatch]);

  const handleEliminar = (id) => {
    dispatch(deleteUsuario(id, userActual.tokenSession));
  };

  const handleBloqueo = (id, nombre) => {
    let res = window.confirm(`Está seguro de querer bloquear a "${nombre}"?`);
    if (res === true) {
      dispatch(
        bloqueoUsuario({ bloqueo: "true" }, id, userActual.tokenSession)
      );
    }
  };

  const handleDesbloqueo = (id, nombre) => {
    let res = window.confirm(
      `Está seguro de querer desbloquear a "${nombre}"?`
    );
    if (res === true) {
      dispatch(
        desbloqueoUsuario({ bloqueo: "false" }, id, userActual.tokenSession)
      );
    }
  };

  return (
    <div className="min-h-100 bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Aside />
        <div className="modal flex flex-col justify-center h-screen bg-gray-200 md:w-4/5 xl:w-4/5">
          <div className="flex flex-col mt-10 items-center contenedor w-auto">
            <div className="modal-content -my-2 py-2 overflow-x-auto w-auto">
              {/* <Filtros /> */}

              <div className="grid grid-cols-2 gap-20">
                {/* Usuarios habilitados */}
                <div className="px-8 py-5 bg-gray-300 rounded">
                  <p className="text-2xl text-center mb-10">
                    Usuarios habilitados
                  </p>
                  {usuarios &&
                    usuarios
                      .filter((user) => user.id !== 1 && !user.bloqueo)
                      .map((user) => (
                        <div key={user.id}>
                          <p className="block text-gray-700 text-sm mb-2">
                            <b>Nombre:</b> {user.nombre} {user.apellido}
                          </p>
                          <p className="block text-gray-700 text-sm mb-2">
                            <b>Email:</b> {user.email}
                          </p>
                          <p className="block text-gray-700 text-sm mb-2">
                            <b>Tipo de usuario:</b> {user.Rol.rol}
                          </p>
                          <p className="block text-gray-700 text-sm mb-2">
                            <span>
                              <b>Estado actual:</b> Habilitado
                            </span>
                          </p>
                          <div className="flex mb-10">
                            <button
                              onClick={() => handleEliminar(user.id)}
                              className="mr-2 rounded bg-red-700 hover:bg-red-900 mt-1  p-2 text-white uppercase font-bold cursor-pointer text-sm"
                            >
                              Eliminar usuario
                            </button>
                            <button
                              onClick={() =>
                                handleBloqueo(user.id, user.nombre)
                              }
                              className="rounded bg-orange-500 hover:bg-orange-700 mt-1 p-2 text-white uppercase font-bold cursor-pointer text-sm"
                            >
                              Inhabilitar usuario
                            </button>
                          </div>
                        </div>
                      ))}
                  {usuarios &&
                    usuarios.filter((user) => !user.bloqueo).length === 1 && (
                      <p className="font-light text-center">
                        No hay usuarios habilitados
                      </p>
                    )}
                </div>
                {/* Usuarios bloqueados */}
                <div className="px-8 py-5 bg-gray-300 rounded">
                  <p className="text-2xl text-center mb-10">
                    Usuarios inhabilitados
                  </p>
                  {usuarios &&
                    usuarios
                      .filter((user) => user.id !== 1 && user.bloqueo)
                      .map((user) => (
                        <div key={user.id}>
                          <p className="block text-gray-700 text-sm mb-2">
                            <b>Nombre:</b> {user.nombre} {user.apellido}
                          </p>
                          <p className="block text-gray-700 text-sm mb-2">
                            <b>Email:</b> {user.email}
                          </p>
                          <p className="block text-gray-700 text-sm mb-2">
                            <b>Tipo de usuario:</b> {user.Rol.rol}
                          </p>
                          <p className="block text-gray-700 text-sm mb-2">
                            <span>
                              <b>Estado actual:</b> Inhabilitado
                            </span>
                          </p>
                          <div className="flex">
                            <button
                              onClick={() => handleEliminar(user.id)}
                              className="mr-2 rounded bg-red-700 hover:bg-red-900 mt-1 mb-10 p-2 text-white uppercase font-bold cursor-pointer text-sm"
                            >
                              Eliminar usuario
                            </button>
                            <button
                              onClick={() =>
                                handleDesbloqueo(user.id, user.nombre)
                              }
                              className="rounded bg-green-700 hover:bg-green-900 mt-1 mb-10 p-2 text-white uppercase font-bold cursor-pointer text-sm"
                            >
                              Habilitar usuario
                            </button>
                          </div>
                        </div>
                      ))}
                  {usuarios &&
                    usuarios.filter((user) => user.bloqueo).length === 0 && (
                      <p className="font-light text-center">
                        No hay usuarios inhabilitados
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
