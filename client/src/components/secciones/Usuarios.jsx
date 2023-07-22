import React, { useEffect, useState, useCallback } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import {
  bloqueoUsuario,
  deleteUsuario,
  desbloqueoUsuario,
  getUsuarios,
} from "../../redux/actions";
// import Filtros from "../recursos/Filtros";
import Swipe from "react-swipe";

export default function Usuarios() {
  const usuarios = useSelector((state) => state.usuarios);
  const userActual = useSelector((state) => state.userActual);
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    dispatch(getUsuarios());
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

  const handleSwipe = useCallback((index) => {
    setCurrentSlide(index);
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="usuariosContainer">
      <Header />
      <h1 className="usuariosTitle">Administrar Usuarios</h1>

      <Swipe
        className="swipe"
        swipeOptions={{
          startSlide: currentSlide,
          speed: 300,
          continuous: false,
          callback: handleSwipe,
        }}
      >
        <div className="todos">
          <h1 className="diapoTitle">Todos</h1>

          {/* Usuarios habilitados */}
          <p className="diapoSubtitle ">Usuarios habilitados</p>
          {usuarios &&
            usuarios
              .filter((user) => user.id !== 1 && !user.bloqueo)
              .map((user) => (
                <div key={user.id} className="cardUsuario">
                  {/* <p className="nombre">
                    {user.nombre} {user.apellido}
                  </p>
                  <p className="email">Email: {user.email}</p>
                  <p>Tipo de usuario: {user.Rol.rol}</p> */}

                  <div className="userData">
                    <div className="userNameRol">
                      <p>
                        {user.nombre} {user.apellido}
                      </p>

                      {user.Rol.id === 2 && <div className="rol">• Admin</div>}
                      {user.Rol.id === 3 && (
                        <div className="rol">• Empleado</div>
                      )}
                    </div>
                    <p className="userEmail">{user.email}</p>
                  </div>

                  <p>Estado actual: Habilitado</p>

                  <div className="acciones">
                    <button onClick={() => handleEliminar(user.id)}>
                      Eliminar usuario
                    </button>
                    <button onClick={() => handleBloqueo(user.id, user.nombre)}>
                      Inhabilitar usuario
                    </button>
                  </div>
                </div>
              ))}
          {usuarios &&
            usuarios.filter((user) => !user.bloqueo).length === 1 && (
              <p>No hay usuarios habilitados</p>
            )}

          {/* Usuarios bloqueados */}
          <p className="diapoSubtitle inhab">Usuarios inhabilitados</p>
          {usuarios &&
            usuarios
              .filter((user) => user.id !== 1 && user.bloqueo)
              .map((user) => (
                <div key={user.id} className="cardUsuario">
                  {/* <p className="nombre">
                    {user.nombre} {user.apellido}
                  </p>
                  <p className="email">Email: {user.email}</p>
                  <p>Tipo de usuario: {user.Rol.rol}</p> */}

                  <div className="userData">
                    <div className="userNameRol">
                      <p>
                        {user.nombre} {user.apellido}
                      </p>

                      {user.Rol.id === 2 && <div className="rol">• Admin</div>}
                      {user.Rol.id === 3 && (
                        <div className="rol">• Empleado</div>
                      )}
                    </div>
                    <p className="userEmail">{user.email}</p>
                  </div>

                  <p>Estado actual: Habilitado</p>
                  <div className="acciones">
                    <button onClick={() => handleEliminar(user.id)}>
                      Eliminar usuario
                    </button>
                    <button
                      onClick={() => handleDesbloqueo(user.id, user.nombre)}
                    >
                      Habilitar usuario
                    </button>
                  </div>
                </div>
              ))}
          {usuarios && usuarios.filter((user) => user.bloqueo).length === 0 && (
            <p>No hay usuarios inhabilitados</p>
          )}
        </div>

        <div className="habilitados">Usuarios habilitados</div>

        <div className="inhabilitados">Usuarios bloqueados</div>
      </Swipe>
    </div>
  );
}
