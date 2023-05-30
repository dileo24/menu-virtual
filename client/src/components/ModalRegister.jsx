import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Aside from "./Aside";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";

export default function ModalRegister({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userActual.tokenSession);
  const [showPassword, setShowPassword] = useState(false);

  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    email: "",
    clave: "",
    rolID: "2",
  });

  const handlerChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(register(input, token));

    navigate("/");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-100 bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Aside />
        <div className="modal flex flex-col justify-center h-screen bg-gray-200 md:w-3/5  xl:w-4/5">
          <h2 className="-mt-16 text-3xl font-light text-center">
            Crear cuenta para empleado
          </h2>

          <div className="flex flex-col mt-10 items-center contenedor w-full">
            <div className="modal-content -my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-10/12 md:w-8/12 lg:w-6/12">
              <div className="form shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <form onSubmit={handleSubmit} className="bg-white p-3">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="nombre"
                    >
                      Nombre
                    </label>

                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="nombre"
                      placeholder="Escribe su nombre"
                      value={input.nombre}
                      onChange={(e) => handlerChange(e)}
                      autoFocus
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="apellido"
                    >
                      Apellido
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="apellido"
                      placeholder="Escribe su apellido"
                      value={input.apellido}
                      onChange={(e) => handlerChange(e)}
                      autoFocus
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Correo electrónico
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="email"
                      name="email"
                      placeholder="Escribe su email"
                      value={input.email}
                      onChange={(e) => handlerChange(e)}
                      required
                    />
                  </div>

                  <div className="mb-4 relative">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="clave"
                    >
                      Contraseña
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type={showPassword ? "text" : "password"}
                      name="clave"
                      placeholder="Escribe su contraseña"
                      value={input.clave}
                      onChange={(e) => handlerChange(e)}
                      required
                    />
                    {showPassword ? (
                      <RiEyeOffLine
                        className=" w-8 absolute top-0 right-0 h-full flex items-center pr-3 text-gray-500 cursor-pointer mt-4 "
                        onClick={handleShowPassword}
                      />
                    ) : (
                      <RiEyeLine
                        className=" w-8 absolute top-0 right-0 h-full flex items-center pr-3 text-gray-500 cursor-pointer mt-4 "
                        onClick={handleShowPassword}
                      />
                    )}
                  </div>

                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="rounded bg-teal-600  w-full hover:bg-teal-900 mt-5 p-2 text-white uppercase font-bold cursor-pointer"
                    >
                      Crear cuenta para empleado
                    </button>
                    <Link to="/">
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded bg-red-700 hover:bg-red-900 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
