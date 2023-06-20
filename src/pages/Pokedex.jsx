import React, { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonList from "../components/pokedex/PokemonList";

const Pokedex = () => {
  // Array de pokemosn antes de filtrar
  const [pokemons, setPokemons] = useState([]);
  //console.log("Pokemons:", pokemons);

 //String para filtar los pokemons por nombre de pokemon
  const [namePokemon, setNamePokemon] = useState("");

  //Tpos de pokemon
  const [types, setTypes] = useState([]);
  //console.log("Tipos almacenados", types);

   //String para filtar los pokemons por tipo
  const [currentType, setCurrentType] = useState("");
  //console.log("Estado currentType:", currentType);
  
  //pagina actual
  const [currentPage, setCurrentPage] = useState(1);

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(namePokemon.toLowerCase().trim())
  );
  //console.log("Listado pokemones que fueron encontrados:", pokemonsByName);

  const paginationLogic = () => {
    const POKEMONS_PER_PAGE = 12;

    // pokemons a presentar
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE;
    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd);

    //última pagina
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1;

    //Bloque actual
    const PAGES_PER_BLOCK = 5;
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);

    // Páginas a presentar en el bloque actual
    const pagesInBlock = [];
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }
    return { pokemonInPage, lastPage, pagesInBlock };
  };

  const { pokemonInPage, lastPage, pagesInBlock } = paginationLogic();
  //console.log("Pokemons in page:", pokemonInPage);
  //console.log("Last Page: ", lastPage);
  //console.log("Pages in Block:", pagesInBlock);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNamePokemon(e.target.namePokemon.value);

    //console.log("Pokemnon a buscar", namePokemon);
  };

  const haandleChangeType = (e) => {
    //console.log("Select cambio!")
    //console.log(e.target.value)
    setCurrentType(e.target.value);
    setNamePokemon("")

  };

  const nameTrainer = useSelector((store) => store.nameTrainer);

  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon/?limit=1281";

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
        //console.log("Error ", err);
      });
  }, []);

  // se llama cada bez que cambie le currentType
  useEffect(() => {
    if (currentType) {
      //console.log("Current type ha cambiado! a:", currentType);
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
          //console.log("Error ", err);
        });
    }
  }, [currentType]);
  useEffect(() => {
    setCurrentPage(1)

  },[namePokemon,currentType])

  // Ir a pagina anterior
  const handleClickPreviousPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };
  // Ir a pagina siguiente
  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage);
    }
  }

  return (
    <div className="bg-gray-200 max-w-[1040px] flex flex-col justify-center mx-auto">
      <Header />
      <p className="py-4 flex flex-row justify-center  ml-2">
        <span className="text-red-500 font-bold">Welcome {nameTrainer}</span>,
        here you can find your favorite pokemon
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row flex-wrap justify-center"
      >
        <div className="pr-4 pl-2">
          <input
            className=""
            id="namePokemon"
            placeholder="Pokemon Name ..."
            type="text"
          />
          <button className="bg-red-600 px-2 text-white">Find</button>
        </div>
        <select className="pl-2 pt-1  " onChange={haandleChangeType}>
          <option className="" value="">
            All
          </option>
          {types.map((type) => (
            <option value={type.name} key={type.url}>
              {type.name}
            </option>
          ))}
        </select>
      </form>

      {/* Paginación */}
      <ul className="flex gap-3 justify-center py-4 px-2 flex-wrap">
        <li onClick={()=> setCurrentPage(1)} className="p-3 bg-red-500 font-bold text-white rounded-md cursor-pointer text-sm ">
          {"<<"}
        </li>
        <li onClick={handleClickPreviousPage} className="p-3 bg-red-500 font-bold text-white rounded-md cursor-pointer text-sm ">
          {"<"}
        </li>
        {pagesInBlock.map((numberPage) => (
          <li
            onClick={() => setCurrentPage(numberPage)}
            className={`p-3 bg-red-500 font-bold text-white rounded-md cursor-pointer ${numberPage === currentPage ? "bg-red-400 text-black":"" }`}
            key={numberPage}
          >
            {numberPage}
          </li>
        ))}
        <li onClick={handleClickNextPage} className="p-3 bg-red-500 font-bold text-white rounded-md cursor-pointer text-sm">
          {">"}
        </li>
        <li onClick={()=> setCurrentPage(lastPage)} className="p-3 bg-red-500 font-bold text-white rounded-md cursor-pointer text-sm">
          {">>"}
        </li>
      </ul>

      {/* Renderizado lista de pokemons */}
      <PokemonList pokemons={pokemonInPage} />

         {/* Paginación barra inferior*/}
         <ul className="flex gap-3 justify-center py-4 px-2 flex-wrap">
        <li onClick={()=> setCurrentPage(1)} className="p-3 bg-red-500 font-bold text-white rounded-md cursor-pointer text-sm ">
          {"<<"}
        </li>
        <li onClick={handleClickPreviousPage} className="p-3 bg-red-500 font-bold text-white rounded-md cursor-pointer text-sm ">
          {"<"}
        </li>
        {pagesInBlock.map((numberPage) => (
          <li
            onClick={() => setCurrentPage(numberPage)}
            className={`p-3 bg-red-500 font-bold text-white rounded-md cursor-pointer ${numberPage === currentPage ? "bg-red-400 text-black":"" }`}
            key={numberPage}
          >
            {numberPage}
          </li>
        ))}
        <li onClick={handleClickNextPage} className="p-3 bg-red-500 font-bold text-white rounded-md cursor-pointer text-sm">
          {">"}
        </li>
        <li onClick={()=> setCurrentPage(lastPage)} className="p-3 bg-red-500 font-bold text-white rounded-md cursor-pointer text-sm">
          {">>"}
        </li>
      </ul>
    </div>
  );
};

export default Pokedex;
