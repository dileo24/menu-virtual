import React, { useEffect } from "react";
import Aside from "./Aside";
import { useDispatch, useSelector } from "react-redux";
import { getUsuarios } from "../redux/actions";

export default function Usuarios() {
  const usuarios = useSelector((state) => state.usuarios);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  return (
    <div className="min-h-100 bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Aside />
        <h2 className="text-3xl font-light text-center">Lista de usuarios</h2>

        {usuarios &&
          usuarios.map((user) => (
            <div key={user.id}>
              <p>
                {user.nombre} {user.apellido}
              </p>
              <p>{user.email}</p>
              <p>{user.Rol.rol}</p>
              <button>Eliminar usuario</button>
              <button>Bloquear usuario</button>
            </div>
          ))}
      </div>
    </div>
  );
}
