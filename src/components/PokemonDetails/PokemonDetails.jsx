import axios from 'axios';
import  { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import "./PokemonDetails.css";
import usePokemonList from '../hooks/usePokemonList';
// import Pokemon from '../Pokemon/Pokemon';
// import PokemonList from '../PokemonList/PokemonList';

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name)
    });
  }

  const [pokemonListState] = usePokemonList('https://pokeapi.co/api/v2/type/fire',false);

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className='pokemon-details-wrapper'>
      <img className='pokemon-details-image' src={pokemon.image} />
      <div className='pokemon-details-name'>name:<span>{pokemon.name}</span></div>
      <div className='pokemon-details-name'>Height: {pokemon.height}</div>
      <div className='pokemon-details-name'>Weight: {pokemon.weight}</div>
      <div className='pokemon-details-types'>
        {pokemon.types && pokemon.types.map((t) => <div key={t}> {t}</div>)}
      </div>

      <div>
        More fire type pokemons
        <ul>
          {
            pokemonListState.pokemonList && pokemonListState.pokemonList.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)
          }
        </ul>
       </div>
    </div>
  )
}

export default PokemonDetails;