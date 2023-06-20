import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Routes, Route } from "react-router-dom";

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
  shadow: "bg-gradient-to-t from-black to-[#C56FFFadd]",
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
  shadow: "border-[#C56FFFadd]",
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
  shadow: "text-[#C56FFFadd]",
};

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);
  //console.log("pokemon URL to render: ",pokemonUrl)

  const formatTypesPokemon = (types = []) => {
    const nameTypes = types.map((type) => type.type.name);
    const titleTypes = nameTypes.join(" / ");
    return titleTypes;
  };

  useEffect(() => {
    //Peticion de datos para el pokemon particular
    axios
      .get(pokemonUrl)
      .then(({ data }) => {
        //console.log("Datos pokemon particular: ",data);
        setPokemon(data);
      })
      .catch((err) => {
        console.log("Error trayendo datos para pokemon particular ", err);
      });
  }, []);

  return (
    <Link to={`/pokedex/${pokemon?.name}`}>
      <article
        className={`m-3 w-[280px] border-8   border-solid  rounded-md ${
          borderColors[pokemon?.types[0].type.name]
        }`}
      >
        {/* Seccion Superior */}
        <section
          className={`relative h-[200px] ${
            pocketLinearGradients[pokemon?.types[0].type.name]
          }`}
        >
          <div className="absolute px-2 -bottom-20">
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt={pokemon?.name}
            />
          </div>
        </section>
        {/* Seccion Inferior */}
        <section className="mt-16 ">
          <h3
            className={`text-center text-2xl font-bold ${
              textColors[pokemon?.types[0].type.name]
            }`}
          >
            {pokemon?.name}
          </h3>
          <h5 className="text-center font-bold">
            {formatTypesPokemon(pokemon?.types)}
          </h5>
          <div className="text-center text-sm text-gray-700">Type</div>
          <hr />
          <section className=" grid grid-cols-2 pb-2">
            {/* Lista de stats */}
            {pokemon?.stats.slice(0, 4).map((stat) => (
              <div className="text-center" key={stat.stat.name}>
                <h6 className="text-sm text-gray-700">{stat.stat.name}</h6>
                <span
                  className={`font-bold ${
                    textColors[pokemon?.types[0].type.name]
                  }`}
                >
                  {stat.base_stat}
                </span>
              </div>
            ))}
          </section>
        </section>
      </article>
    </Link>
  );
};

export default PokemonCard;
