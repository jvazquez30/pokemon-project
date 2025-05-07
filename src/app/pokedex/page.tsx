
import { getPokemonList, getPokemonDetails } from "../../../services/pokemon"
import Image from "next/image";
import Link from "next/link";

export default async function PokemonPage() {

    const pokemonList = await getPokemonList();
    const pokemonDetails = await Promise.all(
        pokemonList.results.map(pokemon => getPokemonDetails(pokemon.name))
    )

    return (
        <div className=" justify-items-center items-center">
            <header className="flex justify-center items-center w-full bg-red-600">
                <Image src="/pokeTrainer.png" alt="Pokemon" width={300} height={300} />
            </header>

            <Link href={'/'}>
                Go Home
            </Link>

            <div className="">
                <h1 className="flex justify-center">Pokemon</h1>
                <ul className="grid grid-cols-5 gap-4">
                    {pokemonDetails.map((pokemon, id) => (
                        <li key={id} className="p-3 border">
                            <div>
                                <Link href={`/pokedex/${pokemon.name}`} className="hover:text-blue-400 hover:underline">
                                    {pokemon.id} - {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}