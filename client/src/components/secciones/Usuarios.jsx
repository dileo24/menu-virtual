import React, { useEffect, useState, useCallback } from "react";
import Header from "../recursos/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  bloqueoUsuario,
  deleteUsuario,
  desbloqueoUsuario,
  getUsuarios,
} from "../../redux/actions";
// import Filtros from "../recursos/Filtros";
import Swipe from "react-swipe";
import { HiOutlinePencil } from "react-icons/hi2";
import { VscTrash } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Filtros from "../recursos/Filtros";

export default function Usuarios() {
  const usuarios = useSelector((state) => state.usuarios);
  const usuariosBusq = useSelector((state) => state.usuariosBusq);
  const userActual = useSelector((state) => state.userActual);
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(null);
  const [diapoActual, setDiapoActual] = useState(0);
  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  const handleEliminar = (id) => {
    dispatch(deleteUsuario(id, userActual.tokenSession));
  };

  const handleBloqueo = useCallback(
    (id, nombre) => {
      let res = window.confirm(`Está seguro de querer bloquear a "${nombre}"?`);
      if (res === true) {
        dispatch(
          bloqueoUsuario({ bloqueo: "true" }, id, userActual.tokenSession)
        );
      }
    },
    [dispatch, userActual.tokenSession]
  );

  const handleDesbloqueo = useCallback(
    (id, nombre) => {
      let res = window.confirm(
        `Está seguro de querer desbloquear a "${nombre}"?`
      );
      if (res === true) {
        dispatch(
          desbloqueoUsuario({ bloqueo: "false" }, id, userActual.tokenSession)
        );
      }
    },
    [dispatch, userActual.tokenSession]
  );

  const handleSwipe = useCallback((index) => {
    setCurrentSlide(index);
    setDiapoActual(index);
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const diapo = document.querySelector(
      `.diapositiva[data-index="${currentSlide}"]`
    );
    if (diapo) {
      const diapoContainerHeight = diapo.offsetHeight;
      const swipe = document.querySelector(".swipe");
      swipe.style.maxHeight = `${diapoContainerHeight}px`;
    }
  }, [currentSlide, handleBloqueo, handleDesbloqueo]);

  useEffect(() => {
    const diapo = document.querySelector(
      `.diapositiva[data-index="${diapoActual}"]`
    );
    if (diapo) {
      const activeCircle = document.querySelector(".circleActive");
      if (activeCircle) {
        activeCircle.classList.remove("circleActive");
      }
      const circle = document.querySelector(`.circle${diapoActual}`);
      if (circle) {
        circle.classList.add("circleActive");
      }
    }
  }, [diapoActual]);

  return (
    <div className="usuariosContainer">
      <Header />
      <h1 className="usuariosTitle">Administrar Usuarios</h1>
      <div className="navbar">
        <Filtros searchType="usuarios" searchWord={"usuarios"} />
      </div>
      <div className="circles">
        <div className="circle0"></div>
        <div className="circle1"></div>
        <div className="circle2"></div>
      </div>
      <Swipe
        className="swipe"
        swipeOptions={{
          startSlide: currentSlide,
          speed: 300,
          continuous: false,
          callback: handleSwipe,
        }}
      >
        {/* Todos */}
        <div className="diapositiva">
          <div className="diapoContainer">
            <h1 className="diapoTitle">Todos</h1>

            {/* Usuarios habilitados */}
            <p className="diapoSubtitle ">Usuarios habilitados</p>
            {usuariosBusq &&
              usuariosBusq
                .filter((user) => user.id !== 1 && !user.bloqueo)
                .map((user) => (
                  <div key={user.id} className="cardUsuario">
                    <div className="userData">
                      <div className="userNameRol">
                        <p>
                          {user.nombre} {user.apellido}
                        </p>
                        {user.Rol.id === 2 && (
                          <div className="rol">• Admin</div>
                        )}
                        {user.Rol.id === 3 && (
                          <div className="rol">• Empleado</div>
                        )}
                      </div>
                      <p className="userEmail">{user.email}</p>
                    </div>

                    <p className="estado habilitado">Habilitado</p>

                    <div className="acciones">
                      <div className="editarEliminar">
                        <Link
                          to={`/editarUsuario/${user.id}`}
                          className="iconContainer1"
                        >
                          <HiOutlinePencil className="editarIcon" />
                        </Link>
                        <button
                          onClick={() => handleEliminar(user.id)}
                          className="iconContainer2"
                        >
                          <VscTrash className="eliminarIcon" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleBloqueo(user.id, user.nombre)}
                        className="cambiarEstado"
                      >
                        inhabilitar
                      </button>
                    </div>
                  </div>
                ))}
            {usuariosBusq &&
              usuariosBusq.filter((user) => !user.bloqueo).length === 1 && (
                <p className="noHayUsuarios">No hay usuarios habilitados</p>
              )}

            {/* Usuarios inhabilitados */}
            <p className="diapoSubtitle inhab">Usuarios inhabilitados</p>
            {usuariosBusq &&
              usuariosBusq
                .filter((user) => user.id !== 1 && user.bloqueo)
                .map((user) => (
                  <div key={user.id} className="cardUsuario">
                    <div className="userData">
                      <div className="userNameRol">
                        <p>
                          {user.nombre} {user.apellido}
                        </p>
                        {user.Rol.id === 2 && (
                          <div className="rol">• Admin</div>
                        )}
                        {user.Rol.id === 3 && (
                          <div className="rol">• Empleado</div>
                        )}
                      </div>
                      <p className="userEmail">{user.email}</p>
                    </div>

                    <p className="estado inhabilitado">Inhabilitado</p>

                    <div className="acciones">
                      <div className="editarEliminar">
                        <button
                          /* onClick={() => handleBloqueo(user.id, user.nombre)} */
                          className="iconContainer1"
                        >
                          <HiOutlinePencil className="editarIcon" />
                        </button>
                        <button
                          onClick={() => handleEliminar(user.id)}
                          className="iconContainer2"
                        >
                          <VscTrash className="eliminarIcon" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleDesbloqueo(user.id, user.nombre)}
                        className="cambiarEstado"
                      >
                        habilitar
                      </button>
                    </div>
                  </div>
                ))}
            {usuariosBusq &&
              usuariosBusq.filter((user) => user.bloqueo).length === 0 && (
                <p className="noHayUsuarios">No hay usuarios inhabilitados</p>
              )}
          </div>
        </div>

        {/* Habilitados */}
        <div className="diapositiva">
          <div className="diapoContainer">
            <h1 className="diapoTitle">Usuarios habilitados</h1>
            {usuarios &&
              usuarios
                .filter((user) => user.id !== 1 && !user.bloqueo)
                .map((user) => (
                  <div key={user.id} className="cardUsuario">
                    <div className="userData">
                      <div className="userNameRol">
                        <p>
                          {user.nombre} {user.apellido}
                        </p>
                        {user.Rol.id === 2 && (
                          <div className="rol">• Admin</div>
                        )}
                        {user.Rol.id === 3 && (
                          <div className="rol">• Empleado</div>
                        )}
                      </div>
                      <p className="userEmail">{user.email}</p>
                    </div>

                    <p className="estado habilitado">Habilitado</p>

                    <div className="acciones">
                      <div className="editarEliminar">
                        <Link
                          to={`/editarUsuario/${user.id}`}
                          className="iconContainer1"
                        >
                          <HiOutlinePencil className="editarIcon" />
                        </Link>
                        <button
                          onClick={() => handleEliminar(user.id)}
                          className="iconContainer2"
                        >
                          <VscTrash className="eliminarIcon" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleBloqueo(user.id, user.nombre)}
                        className="cambiarEstado"
                      >
                        inhabilitar
                      </button>
                    </div>
                  </div>
                ))}
            {usuarios &&
              usuarios.filter((user) => !user.bloqueo).length === 1 && (
                <p className="noHayUsuarios">No hay usuarios habilitados</p>
              )}
          </div>
        </div>

        {/* Inhabilitados */}
        <div className="diapositiva">
          <div className="diapoContainer">
            <h1 className="diapoTitle">Usuarios inhabilitados</h1>

            {usuarios &&
              usuarios
                .filter((user) => user.id !== 1 && user.bloqueo)
                .map((user) => (
                  <div key={user.id} className="cardUsuario">
                    <div className="userData">
                      <div className="userNameRol">
                        <p>
                          {user.nombre} {user.apellido}
                        </p>
                        {user.Rol.id === 2 && (
                          <div className="rol">• Admin</div>
                        )}
                        {user.Rol.id === 3 && (
                          <div className="rol">• Empleado</div>
                        )}
                      </div>
                      <p className="userEmail">{user.email}</p>
                    </div>

                    <p className="estado inhabilitado">Inhabilitado</p>

                    <div className="acciones">
                      <div className="editarEliminar">
                        <button
                          /* onClick={() => handleBloqueo(user.id, user.nombre)} */
                          className="iconContainer1"
                        >
                          <HiOutlinePencil className="editarIcon" />
                        </button>
                        <button
                          onClick={() => handleEliminar(user.id)}
                          className="iconContainer2"
                        >
                          <VscTrash className="eliminarIcon" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleDesbloqueo(user.id, user.nombre)}
                        className="cambiarEstado"
                      >
                        habilitar
                      </button>
                    </div>
                  </div>
                ))}
            {usuarios &&
              usuarios.filter((user) => user.bloqueo).length === 0 && (
                <p className="noHayUsuarios">No hay usuarios inhabilitados</p>
              )}
          </div>
        </div>
      </Swipe>

      <footer>
        <Link to="/register" className="botonFooter">
          <div className="signoMas1">
            <div className="signoMas2"></div>
          </div>
          Crear Nuevo Usuario
        </Link>
      </footer>
    </div>
  );
}
