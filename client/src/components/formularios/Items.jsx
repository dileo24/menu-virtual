import React from "react";
import Button from "../recursos/Button";

export default function Items({
  itemsExtra,
  setItemsExtra,
  numItemsExtra,
  setNumItemsExtra,
  itemsExtraArray,
}) {
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

    if (numItemsExtra === 0) {
      newNumItemsExtra = 2;
    } else {
      newNumItemsExtra++;
    }

    setNumItemsExtra(newNumItemsExtra);

    let newItemsExtra = [...itemsExtra];
    for (let i = 0; i < newNumItemsExtra - itemsExtra.length; i++) {
      newItemsExtra.push("");
    }
    setItemsExtra(newItemsExtra);
  };

  const decrementNumItems = () => {
    if (numItemsExtra > 0) {
      if (numItemsExtra === 2) {
        setNumItemsExtra(0);
        setItemsExtra([]);
      } else {
        setNumItemsExtra(numItemsExtra - 1);
        setItemsExtra(itemsExtra.slice(0, -1));
      }
    }
  };

  return (
    <>
      <div className="mb-4 ">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="numItemsExtra"
        >
          Cantidad de ítems Extra
          <span className="font-normal"> (no obligatorio)</span>
        </label>
        <div className="flex">
          <Button signo="-" funcion={decrementNumItems} />
          <p
            className="w-5 mx-3 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleNumItemsChange}
            readOnly
          >
            {numItemsExtra}
          </p>
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

            {itemsExtraArray.map((item) => (
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
