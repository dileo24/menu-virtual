import React, { useEffect /* , useState */ } from "react";
import { deleteCateg, getCategorias } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../secciones/Header";
import { Link } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
import { HiOutlinePencil } from "react-icons/hi2";

export default function AdminCateg() {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias);
  const token = useSelector((state) => state.userActual.tokenSession);
  let productosState = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  const handleDelete = (id) => {
    const categDel = categorias.find((categ) => categ.id === id);

    const matchingProduct = productosState.find(
      (producto) => producto.categoriaID === id
    );
    if (matchingProduct) {
      alert(
        `Error: No se puede eliminar una categoría que tenga productos asociados. Primero debes editar la Categoría de los productos que pertenezcan a ${categDel.nombre}, o eliminarlos.`
      );
    } else {
      window.confirm(
        `¿Seguro de querer borrar la categoría ${categDel && categDel.nombre}?`
      ) && dispatch(deleteCateg(id, token));
    }
  };

  // const handleCateg = (e) => {
  //   setInput({ ...input, categID: e.target.value });
  // };

  return (
    <>
      <Header />
      <div className="categContainer">
        <h1 className="categTitle">Administrar Categorías</h1>

        <div>
          {categorias &&
            categorias.map((categ) => (
              <div key={categ.id} className="cardCateg">
                <p className="categName">{categ.nombre}</p>
                {categ.subcategorias && (
                  <ul className="subCategs">
                    {categ.subcategorias.map((subC, index) => (
                      <li key={index} className="list-item">
                        <span className="list-item-circle"></span> {subC.nombre}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="administrarCateg">
                  <div className="editCrearSubcateg">
                    <div className="iconContainer1">
                      <Link
                        to={`/editCateg/${categ.id}`}
                        className="editarItems"
                      >
                        <HiOutlinePencil className="editarIcon" />
                      </Link>
                    </div>
                    <div className="btnContainer">
                      <Link
                        //   to={`/updateItems/${prod.id}/${index}`}
                        to={`/subcategs/${categ.id}`}
                        className="crearSubcateg"
                      >
                        <div className="signoMas1">
                          <div className="signoMas2"></div>
                        </div>
                        Subcategoría
                      </Link>
                    </div>
                  </div>
                  <div className="iconContainer2">
                    <VscTrash
                      className="eliminarIcon"
                      onClick={() => {
                        handleDelete(categ.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <footer>
          <Link to="/nuevaCateg" className="botonFooter">
            <div className="signoMas1">
              <div className="signoMas2"></div>
            </div>
            Crear Nueva Categoría
          </Link>
        </footer>
      </div>
    </>
  );
}
