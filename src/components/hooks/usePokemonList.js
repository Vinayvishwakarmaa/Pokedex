import axios from "axios";
import { useEffect, useState } from "react";
// import React from "react";

function usePokemonList(url, type) {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: url,
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons() {
    // setIsLoading(true);
    setPokemonListState((state) => ({
      ...state,
      isLoading: true,
    }));
    const response = await axios.get(pokemonListState.pokedexUrl);
    const pokemonResults = response.data.results;

    console.log(response.data.pokemon);
    console.log(pokemonListState);
    // setNextUrl(response.data.next);
    // setPrevUrl(response.data.previous);
    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));
    // setPrevUrl(response.data.previous);

    if (type) {
      setPokemonListState((state) => ({
        ...state,
        pokemonList: response.data.pokemon.slice(0, 5)
      }))
    } else {
      const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url)
      );

      const pokemonData = await axios.all(pokemonResultPromise);

      const pokemonResult = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.front_shiny,
          types: pokemon.types,
        };
      });

      setPokemonListState((state) => ({
        ...state,
        pokemonList: pokemonResult,
        isLoading: false,
      }));
    }
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
