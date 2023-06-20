import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons }) => {
  //console.log("Pokemons a renderizar:", pokemons);
  return (
    <section className="flex flex-row flex-wrap mt-3 justify-center
    ">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}/>
      ))}
    </section>
  );
};

export default PokemonList;
