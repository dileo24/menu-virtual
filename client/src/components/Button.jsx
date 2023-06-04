function Button({ signo, funcion }) {
  return (
    <button
      className="h-8 w-8 flex items-center justify-center font-bold text-black text-xl bg-teal-600 rounded-full hover:bg-teal-800 focus:outline-none"
      type="button"
      onClick={funcion}
    >
      <div className="-mt-1 text-white">{signo}</div>
    </button>
  );
}

export default Button;
