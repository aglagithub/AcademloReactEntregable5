import React, { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const PokemonId = () => {
  const [pokemon, setPokemon] = useState(null);
  //console.log("Pokemon Info:", pokemon);
  const { pokemonName } = useParams();
  const STAT_MAX = 255;

  const pocketLinearGradients = {
    normal: "bg-gradient-to-t from-black to-[#ACAD99]",
    fighting: "bg-gradient-to-t from-black to-[#C45D4C]",
    flying: "bg-gradient-to-t from-black to-[#90AAD7]",
    poison: "bg-gradient-to-t from-black to-[#B369AF]",
    ground: "bg-gradient-to-t from-black to-[#CEB250]",
    rock: "bg-gradient-to-t from-black to-[#BAA85E]",
    bug: "bg-gradient-to-t from-black to-[#ACC23E]",
    ghost: "bg-gradient-to-t from-black to-[#816DB6]",
    steel: "bg-gradient-to-t from-black to-[#9AA9AF]",
    fire: "bg-gradient-to-t from-black to-[#E87A3D]",
    water: "bg-gradient-to-t from-black to-[#639CE4]",
    grass: "bg-gradient-to-t from-black to-[#82C95B]",
    electric: "bg-gradient-to-t from-black to-[#E7C536]",
    psychic: "bg-gradient-to-t from-black to-[#E96C95]",
    ice: "bg-gradient-to-t from-black to-[#81CFD7]",
    dragon: "bg-gradient-to-t from-black to-[#8572C8]",
    dark: "bg-gradient-to-t from-black to-[#79726B]",
    fairy: "bg-gradient-to-t from-black to-[#E8b0EB]",
    unknown: "bg-gradient-to-t from-black to-[#E0E0E0]",
    shadow: "bg-gradient-to-t from-black to-[#BD3CFD]",
  };
  const pocketHorizontalLinearGradients = {
    normal: "bg-gradient-to-r from-white to-[#ACAD99]",
    fighting: "bg-gradient-to-r from-white to-[#C45D4C]",
    flying: "bg-gradient-to-r from-white to-[#90AAD7]",
    poison: "bg-gradient-to-r from-white to-[#B369AF]",
    ground: "bg-gradient-to-r from-white to-[#CEB250]",
    rock: "bg-gradient-to-r from-white to-[#BAA85E]",
    bug: "bg-gradient-to-r from-white to-[#ACC23E]",
    ghost: "bg-gradient-to-r from-white to-[#816DB6]",
    steel: "bg-gradient-to-r from-white to-[#9AA9AF]",
    fire: "bg-gradient-to-r from-white to-[#E87A3D]",
    water: "bg-gradient-to-r from-white to-[#639CE4]",
    grass: "bg-gradient-to-r from-white to-[#82C95B]",
    electric: "bg-gradient-to-r from-white to-[#E7C536]",
    psychic: "bg-gradient-to-r from-white to-[#E96C95]",
    ice: "bg-gradient-to-r from-white to-[#81CFD7]",
    dragon: "bg-gradient-to-r from-white to-[#8572C8]",
    dark: "bg-gradient-to-r from-white to-[#79726B]",
    fairy: "bg-gradient-to-r from-white to-[#E8b0EB]",
    unknown: "bg-gradient-to-r from-white to-[#E0E0E0]",
    shadow: "bg-gradient-to-r from-white to-[#BD3CFD]",
  };
  const borderColors = {
    normal: "border-[#ACAD99]",
    fighting: "border-[#C45D4C]",
    flying: "border-[#90AAD7]",
    poison: "border-[#B369AF]",
    ground: "border-[#CEB250]",
    rock: "border-[#BAA85E]",
    bug: "border-[#ACC23E]",
    ghost: "border-[#816DB6]",
    steel: "border-[#9AA9AF]",
    fire: "border-[#E87A3D]",
    water: "border-[#639CE4]",
    grass: "border-[#82C95B]",
    electric: "border-[#E7C536]",
    psychic: "border-[#E96C95]",
    ice: "border-[#81CFD7]",
    dragon: "border-[#8572C8]",
    dark: "border-[#79726B]",
    fairy: "border-[#E8b0EB]",
    unknown: "border-[#E0E0E0]",
    shadow: "border-[#BD3CFD]",
  };
  const textColors = {
    normal: "text-[#ACAD99]",
    fighting: "text-[#C45D4C]",
    flying: "text-[#90AAD7]",
    poison: "text-[#B369AF]",
    ground: "text-[#CEB250]",
    rock: "text-[#BAA85E]",
    bug: "text-[#ACC23E]",
    ghost: "text-[#816DB6]",
    steel: "text-[#9AA9AF]",
    fire: "text-[#E87A3D]",
    water: "text-[#639CE4]",
    grass: "text-[#82C95B]",
    electric: "text-[#E7C536]",
    psychic: "text-[#E96C95]",
    ice: "text-[#81CFD7]",
    dragon: "text-[#8572C8]",
    dark: "text-[#79726B]",
    fairy: "text-[#E8b0EB]",
    unknown: "text-[#E0E0E0]",
    shadow: "text-[#BD3CFD]",
  };

  // funcion para calcular el largo de una barra de atats
  const percentProgresStat = (baseStat) => {
    return `${(baseStat * 100) / STAT_MAX}%`;
  };
  //console.log("Pokemon por ver características: ",pokemonName)
  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    //console.log("URL del pokemon a visualizar",url)

    //Peticion datos pokemon particular
    axios
      .get(url)
      .then(({ data }) => {
        //console.log("Datos pokemon particular: ", data);
        setPokemon(data);
      })
      .catch((err) => {
        //console.log("Error trayendo datos para pokemon particular ", err);
      });
  }, []);

  return (
    <main className="bg-gray-200 max-w-[1040px]  mx-auto min-h-screen
    pb-3">
      <Header />
      {/* Main Container */}
      <section className="bg-white w-[80%] mx-auto ">
        <section className="border-3 border-white border-solid my">
          {/* Pokemon image */}
          <article
            className={`mx-auto w-[98%] border-2   border-solid  rounded-md mb-2 mt-[100px]`}
          >
            <section
              className={`relative h-[100px] mt-2 ${
                pocketLinearGradients[pokemon?.types[0].type.name]
              }`}
            >
              <div className="absolute px-2 -top-[100px] ">
                <img
                  className="w-[200px]"
                  src={pokemon?.sprites.other["official-artwork"].front_default}
                  alt={pokemon?.name}
                />
              </div>
            </section>
          </article>
          {/* Pokemon info detail */}
          <article className="mx-auto w-[98%] ">
            <div className="text-center text-2xl"># {pokemon?.id}</div>
            <div className="text-center text-4xl font-bold">{pokemon?.name}</div>
            <div className="flex flex-row justify-center gap-4 mt-2 text-center text-sm mb-2">
              <div className="">
                <div className="font-semibold">Weight</div>
                <div>{pokemon?.weight}</div>
              </div>
              <div>
                <div className="font-semibold">Height</div>
                <div>{pokemon?.height}</div>
              </div>
            </div>
            <hr />
            <div className="flex flex-row justify-center gap-10 mt-2 text-center text-sm mb-3">
              <div className="flex flex-col">
                <div className="mb-1 font-semibold">Types</div>
                <div className="flex flex-row justify-center gap-2" >
                  <div className="border border-solid border-black p-1">{pokemon?.types[0]?.type.name}</div>
                  <div className="border border-solid border-black p-1">{pokemon?.types[1]?.type.name}</div>
                </div>
              </div>
              <div className="flex flex-col">
              <div className="mb-1 font-semibold">Abilities</div>
              <div className="flex flex-row justify-center gap-2">
                <div className="border border-solid border-gray-400 p-1">{pokemon?.abilities[0]?.ability.name}</div>
                <div  className="border border-solid border-gray-400 p-1">{pokemon?.abilities[1]?.ability.name}</div>
                </div>
              </div>
            </div>
          </article>
        </section>
        <hr />

        {/* stats */}
        <section className="ml-2 mr-2">
          <span className="font-bold">Stats</span>
          {pokemon?.stats.map((stat) => (
            <article key={stat.stat.url}>
              <section className="flex flex-row text-sm justify-between">
                <h5>{stat.stat.name}</h5>
                <div className="">
                  {stat.base_stat}/{STAT_MAX}
                </div>
              </section>
              {/* Barra de Progreso */}
              <div className="bg-gray-100 h-8 rounded-md overflow-hidden">
                <div
                  style={{ width: percentProgresStat(stat.base_stat) }}
                  className={`h-full ${
                    pocketHorizontalLinearGradients[pokemon?.types[0].type.name]
                  } `}
                ></div>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
};

export default PokemonId;
