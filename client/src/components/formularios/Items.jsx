import React from "react";
import Button from "../recursos/Button";
import { useSelector } from "react-redux";

export default function Items({
  itemsExtra,
  setItemsExtra,
  numItemsExtra,
  setNumItemsExtra,
  itemsExtraArray,
  categoriaID,
}) {
  const categorias = useSelector((state) => state.categorias);
  const categsItems = categorias.filter((c) => c.id !== 1 && c.id !== 2);

  const handleNumItemsChange = (e) => {
    let count = parseInt(e.target.value);
    setNumItemsExtra(count);
    setItemsExtra(Array(count).fill(""));
  };

  const handleItemChange = (e, index) => {
    const updatedItems = [...itemsExtra];
    updatedItems[index] = e.target.value;
    setItemsExtra(updatedItems);
  };

  const incrementNumItems = () => {
    let newNumItemsExtra = numItemsExtra;
    newNumItemsExtra++;
    setNumItemsExtra(newNumItemsExtra);
    let newItemsExtra = [...itemsExtra];
    for (let i = 0; i < newNumItemsExtra - itemsExtra.length; i++) {
      newItemsExtra.push("");
    }
    setItemsExtra(newItemsExtra);
  };

  const decrementNumItems = () => {
    if (numItemsExtra > 0) {
      setNumItemsExtra(numItemsExtra - 1);
      setItemsExtra(itemsExtra.slice(0, -1));
    }
  };

  return (
    <>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="numItemsExtra"
        >
          Ítems Extra
          <span className="font-normal"> (no obligatorio)</span>
        </label>
        <div className="flex">
          {numItemsExtra ? (
            <>
              {" "}
              <Button signo="-" funcion={decrementNumItems} />
              <p
                className="w-5 mx-3 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleNumItemsChange}
                readOnly
              >
                {numItemsExtra}
              </p>
            </>
          ) : (
            ""
          )}

          <Button signo="+" funcion={incrementNumItems} />
        </div>
      </div>

      {itemsExtra.map((item, index) => (
        <div className="mb-4" key={index}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={`item${index}`}
          >
            ítem {index + 1}
          </label>
          <select onChange={(e) => handleItemChange(e, index)}>
            <option hidden>
              {itemsExtra[index] === "" ? "Elegí un item" : itemsExtra[index]}
            </option>

            {categsItems.map((item) => (
              <option key={item.id} value={item.nombre}>
                {item.nombre}
              </option>
            ))}
          </select>
        </div>
      ))}
    </>
  );
}

// Código para también imprimir los nombres de las subcategorías que contengan productos con item:true
// import React from "react";
// import Button from "../recursos/Button";
// import { useSelector } from "react-redux";

// export default function Items({
//   itemsExtra,
//   setItemsExtra,
//   numItemsExtra,
//   setNumItemsExtra,
// }) {
//   let productosState = useSelector((state) => state.home);
//   const productosConItemTrue = productosState.filter(
//     (producto) => producto.item === true
//   );
//   console.log(productosConItemTrue);

//   const handleNumItemsChange = (e) => {
//     let count = parseInt(e.target.value);
//     setNumItemsExtra(count);
//     setItemsExtra(Array(count).fill(""));
//   };

//   const handleItemChange = (e, index) => {
//     const updatedItems = [...itemsExtra];
//     updatedItems[index] = e.target.value;
//     setItemsExtra(updatedItems);
//   };

//   const incrementNumItems = () => {
//     let newNumItemsExtra = numItemsExtra;
//     newNumItemsExtra++;
//     setNumItemsExtra(newNumItemsExtra);
//     let newItemsExtra = [...itemsExtra];
//     for (let i = 0; i < newNumItemsExtra - itemsExtra.length; i++) {
//       newItemsExtra.push("");
//     }
//     setItemsExtra(newItemsExtra);
//   };

//   const decrementNumItems = () => {
//     if (numItemsExtra > 0) {
//       setNumItemsExtra(numItemsExtra - 1);
//       setItemsExtra(itemsExtra.slice(0, -1));
//     }
//   };

//   // Filter productosConItemTrue to store only unique items based on names
//   const uniqueProductosConItemTrue = Array.from(
//     new Set(
//       productosConItemTrue.map((producto) => {
//         return producto.subcategoria
//           ? producto.subcategoria.nombre
//           : producto.categoria.nombre;
//       })
//     )
//   ).map((nombre) => {
//     return productosConItemTrue.find((producto) => {
//       return (
//         (producto.subcategoria
//           ? producto.subcategoria.nombre
//           : producto.categoria.nombre) === nombre
//       );
//     });
//   });

//   return (
//     <>
//       <div className="mb-4">
//         <label
//           className="block text-gray-700 text-sm font-bold mb-2"
//           htmlFor="numItemsExtra"
//         >
//           Ítems Extra
//           <span className="font-normal"> (no obligatorio)</span>
//         </label>
//         <div className="flex">
//           {numItemsExtra ? (
//             <>
//               {" "}
//               <Button signo="-" funcion={decrementNumItems} />
//               <p
//                 className="w-5 mx-3 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 onChange={handleNumItemsChange}
//                 readOnly
//               >
//                 {numItemsExtra}
//               </p>
//             </>
//           ) : (
//             ""
//           )}

//           <Button signo="+" funcion={incrementNumItems} />
//         </div>
//       </div>

//       {itemsExtra.map((item, index) => (
//         <div className="mb-4" key={index}>
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor={`item${index}`}
//           >
//             ítem {index + 1}
//           </label>
//           <select onChange={(e) => handleItemChange(e, index)}>
//             <option hidden>
//               {itemsExtra[index] === "" ? "Elegí un item" : itemsExtra[index]}
//             </option>

//             {uniqueProductosConItemTrue.map((producto) => (
//               <option
//                 key={producto.id}
//                 value={
//                   producto.subcategoria
//                     ? producto.subcategoria.nombre
//                     : producto.categoria.nombre
//                 }
//               >
//                 {producto.subcategoria
//                   ? producto.subcategoria.nombre
//                   : producto.categoria.nombre}
//               </option>
//             ))}
//           </select>
//         </div>
//       ))}
//     </>
//   );
// }
