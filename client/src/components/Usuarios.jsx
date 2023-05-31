import React, { useEffect } from "react";
import Aside from "./Aside";
import { useDispatch, useSelector } from "react-redux";
import {
  bloqueoUsuario,
  deleteUsuario,
  desbloqueoUsuario,
  getUsuarios,
} from "../redux/actions";

export default function Usuarios() {
  const usuarios = useSelector((state) => state.usuarios);
  const userActual = useSelector((state) => state.userActual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  const handlerEliminar = (id) => {
    dispatch(deleteUsuario(id, userActual.tokenSession));
  };

  const handlerBloqueo = (id, nombre) => {
    let res = window.confirm(`Está seguro de querer bloquear a "${nombre}"?`);
    if (res === true) {
      dispatch(
        bloqueoUsuario({ bloqueo: "true" }, id, userActual.tokenSession)
      );
    }
  };

  const handlerDesbloqueo = (id, nombre) => {
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
        <div className="modal flex flex-col justify-center h-screen bg-gray-200 md:w-3/5  xl:w-4/5">
          <h2 className="text-3xl font-light text-center">Lista de usuarios</h2>

          <div className="flex flex-col mt-10 items-center contenedor w-auto">
            <div className="modal-content -my-2 py-2 overflow-x-auto  w-auto">
              <div className="form shadow overflow-hidden sm:rounded-lg border-b border-gray-200 w-auto">
                <div className="bg-white p-3 w-auto">
                  {usuarios &&
                    usuarios.map((user) => (
                      <div key={user.id} className="">
                        <div className="">
                          <p className="block text-gray-700 text-sm mb-2">
                            <b>Nombre:</b> {""}
                            {user.nombre} {user.apellido}
                          </p>
                          <p className="block text-gray-700 text-sm mb-2">
                            <b>Email:</b> {""}
                            {user.email}
                          </p>
                          <p className="block text-gray-700 text-sm mb-2">
                            <b>Tipo de usuario:</b> {""}
                            {user.Rol.rol}
                          </p>
                          <p className="block text-gray-700 text-sm mb-2">
                            {user.bloqueo === false ? (
                              <b>Estado actual: Habilitado</b>
                            ) : (
                              <b>Estado actual: Bloqueado</b>
                            )}
                          </p>
                        </div>
                        <div className="flex">
                          <button
                            onClick={() => handlerEliminar(user.id)}
                            className=" mr-2 rounded bg-red-700 hover:bg-red-900 mt-1 mb-10 p-2 text-white uppercase font-bold cursor-pointer text-sm"
                          >
                            Eliminar usuario
                          </button>
                          {user.bloqueo === false ? (
                            <button
                              onClick={() =>
                                handlerBloqueo(user.id, user.nombre)
                              }
                              className="rounded bg-red-700 hover:bg-red-900 mt-1 mb-10 p-2 text-white uppercase font-bold cursor-pointer text-sm"
                            >
                              Bloquear usuario
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handlerDesbloqueo(user.id, user.nombre)
                              }
                              className="rounded bg-red-700 hover:bg-red-900 mt-1 mb-10 p-2 text-white uppercase font-bold cursor-pointer text-sm"
                            >
                              Desbloquear usuario
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
