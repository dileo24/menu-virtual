import React, { useEffect, useState } from "react";
import { deleteCateg, getCategorias, postCateg } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NuevaCateg() {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias);
  const token = useSelector((state) => state.userActual.tokenSession);

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  const [input, setInput] = useState({
    nombre: "",
  });

  const handleDelete = (id) => {
    const categDel = categorias.find((categ) => categ.id === id);
    window.confirm(
      `¿Seguro de querer borrar la categoría ${categDel && categDel.nombre}?`
    ) && dispatch(deleteCateg(id, token));
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCateg(input, token)).then(() => {
      dispatch(getCategorias());
      alert("Categoria creada con éxito!");
      setInput({ nombre: "" });
    });
  };

  return (
    <div className="min-h-100 bg-gray-200">
      <Link to="/" className="">
        Atrás
      </Link>
      <div className="md:flex min-h-screen md:align-top">
        <div className="flex flex-col justify-center h-screen bg-gray-200 md:w-4/5  xl:w-4/5">
          <h2 className="-mt-16 text-3xl font-light text-center">
            Crear Categoria
          </h2>

          <div className="flex flex-col mt-10 items-center contenedor w-full">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 w-10/12 md:w-8/12 lg:w-6/12">
              <div className="form shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <form onSubmit={handleSubmit} className="bg-white p-3">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Nombre de categoría nueva
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="nombre"
                      placeholder="Escribe el nombre"
                      value={input.nombre}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="rounded w-full bg-teal-600 hover:bg-teal-900 mt-5 p-2 text-white uppercase font-bold cursor-pointer"
                    >
                      Crear
                    </button>
                  </div>
                </form>
                {categorias &&
                  categorias.map((categ) => (
                    <div key={categ.id}>
                      {categ.nombre}
                      <button onClick={() => handleDelete(categ.id)}>
                        |X|
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
