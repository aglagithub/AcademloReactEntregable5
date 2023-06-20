import React from "react";
import { useDispatch } from "react-redux";

import FooterHome from "../components/home/FooterHome";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit = (e)=>{
    e.preventDefault()
    //alert("Start! pulsed")
    const nameTrainer = e.target.nameTrainer.value
    //alert(nameTrainer)
    dispatch(setNameTrainer(nameTrainer))
    navigate("/pokedex")
  }
  return (
    <main className="grid grid-rows-[1fr_auto] min-h-screen max-w-[1040px] mx-auto bg-gray-200">
      {/* Sección superior */}
      <section className="text-center flex flex-col mx-auto justify-evenly">
        <div className="px-4">
          <img src="/images/logo.png" alt="" />
        </div>
        <h3 className="text-red-600 text-[2rem]">¡Hello trainer!</h3>
        <p className="text-xl">For start, give me your name:</p>
        <form onSubmit={handleSubmit}>
          <span className=" mr-2 p-2 rounded-lg  ">
          
            <input className="max-w-[100px]" id="nameTrainer" required type="text"/>
          </span>

          <button className="bg-red-600  px-4 my-2 rounded-sm text-white">
            Start!
          </button>
        </form>
      </section>
      {/* Sección inferior */}

      <FooterHome />
    </main>
  );
};

export default Home;
