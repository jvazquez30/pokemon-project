
import { getPokemonList, getPokemonDetails } from "../../../services/pokemon"


export default async function PokemonPage() {

    const pokemonList = await getPokemonList();
    const pokemonDetails = await Promise.all(
        pokemonList.results.map(pokemon => getPokemonDetails(pokemon.name))
    )

    return (
        <div>
            <div>
                <h1>Pokemon</h1>
                <ul>
                    {pokemonDetails.map((details, id) => (
                        <li key={id}>
                            {details.name}
                            {details.id}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}