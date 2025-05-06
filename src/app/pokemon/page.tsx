
import { getPokemonList, getPokemonDetails } from "../../../services/pokemon"


export default async function PokemonPage() {

    const pokemonList = await getPokemonList();
    const pokemonDetails = await getPokemonDetails(pokemonList.results[0].name);

    return (
        <div>
            <div>
                <h1>Pokemon</h1>
                <ul>
                    {pokemonList.results.map(pokemon => (
                        <li key={pokemon.name}>
                            {pokemon.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}