import React, { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonList from "../components/pokedex/PokemonList";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  const [namePokemon, setNamePokemon] = useState("");

  const [types, setTypes] = useState([]);
  //console.log("Tipos almacenados", types);
  const [currentType, setCurrentType] = useState("");
  console.log("Estado currentType:", currentType);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNamePokemon(e.target.namePokemon.value);

    console.log("Pokemnon a buscar", namePokemon);
  };

  const haandleChangeType = (e) => {
    //console.log("Select cambio!")
    //console.log(e.target.value)
    setCurrentType(e.target.value);
  };

  const nameTrainer = useSelector((store) => store.nameTrainer);
  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(namePokemon.toLowerCase().trim())
  );
  console.log("Listado pokemones que fueron encontrados:", pokemonsByName);

  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50";

      axios
        .get(URL)
        .then(({ data }) => {
          //console.log("Datos Recidos servicio: ",data.results);
          setPokemons(data.results);
        })
        .catch((err) => {
          console.log("Error ", err);
        });
    }
  }, [currentType]);

  //obtener los tipos de pokemon que hay registrados
  useEffect(() => {
    //console.log("Buscando tipos de pokemon...");

    const URL = "https://pokeapi.co/api/v2/type";

    axios
      .get(URL)
      .then(({ data }) => {
        //console.log("Tipos de pokemon registrados: ", data.results);
        setTypes(data.results);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  }, []);

  // se llama cada bez que cambie le currentType
  useEffect(() => {
    if (currentType) {
      console.log("Current type ha cambiado! a:", currentType);
      // Llamar servicio paara traer nuevo listado filtado
      const url = `https://pokeapi.co/api/v2/type/${currentType}/`;
      axios
        .get(url)
        .then(({ data }) => {
          //console.log("Tipos de pokemon encotrados: ", data.results);
          // es necesario transformar el objeto para tenga el mismo formato que las peticiones anteriores
          const pokemonsByType = data.pokemon.map((pokemon) => pokemon.pokemon);
          //console.log("Pokemons by type",pokemonsByType)
          setPokemons(pokemonsByType);
        })
        .catch((err) => {
          console.log("Error ", err);
        });
    }
  }, [currentType]);

  return (
    <div className="bg-gray-200 max-w-[1040px] flex flex-col justify-center mx-auto"> 
      <Header />
      <p className="py-4 flex flex-row justify-center  ml-2">
        <span className="text-red-500 font-bold">Welcome {nameTrainer}</span>, here you can find your favorite
        pokemon
      </p>
      <form onSubmit={handleSubmit} className="flex flex-row flex-wrap justify-center">
        <div className="pr-4 pl-2">
          <input className="" id="namePokemon" placeholder="Pokemon Name ..." type="text" />
          <button className="bg-red-600 px-2 text-white">Find</button>
        </div>
        <select className="pl-2 pt-1  "onChange={haandleChangeType}>
          <option className=""value="">All</option>
          {types.map((type) => (
            <option value={type.name} key={type.url}>
              {type.name}
            </option>
          ))}
        </select>
      </form>
      {/* Renderizado de pokemons */}
      <PokemonList pokemons={pokemonsByName} />
    </div>
  );
};

export default Pokedex;
