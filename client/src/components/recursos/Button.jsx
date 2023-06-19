function Button({ signo, funcion }) {
  return (
    <button
      className="contador h-6 w-6 flex items-center justify-center font-bold text-black text-xl rounded-full focus:outline-none"
      type="button"
      onClick={funcion}
    >
      <div className="text-white">{signo}</div>
    </button>
  );
}

export default Button;
