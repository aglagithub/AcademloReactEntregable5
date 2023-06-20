import React from "react";
import { setNameTrainer } from "../../store/slices/nameTrainer.slice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const handleClickLogout = () => {
    console.log("Logging out ...");
    dispatch(setNameTrainer(""));
  };
  return (
    <section className="relative">
      {/*Sección roja  */}
      <div className="bg-red-600 h-20 relative">
        <div className="absolute left-3 bottom-3 w-[220px] xxs:w-[290px] sm:[400px]">
          <img src="/images/logo.png" alt="" />
        </div>
      </div>
      {/*Sección Negra  */}
      <div className="bg-black h-12"></div>

      {/*Boton Pokeball  */}
      <div className='w-20 aspect-square bg-white border-[6px] border-black rounded-full absolute -bottom-4 right-0 -translate-x-[50%] after:content-[""] after:h-11 after:aspect-square after:bg-gray-800 after:rounded-full after:absolute after:top-[50%] after:-translate-y-[50%] after:left-[50%] after:-translate-x-[50%] after:border-[9px] after:border-black'>
        <button
          onClick={handleClickLogout}
          className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-white z-20"
        >
          X
        </button>
      </div>
    </section>
  );
};

export default Header;
