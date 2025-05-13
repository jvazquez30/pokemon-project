
import { useParams } from "next/navigation";
import { getPokemonEvolutions, getPokemonDetails, PokemonEvolution, PokemonDetails } from "../../../services/pokemon";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PokemonEvolutions() {
    const params = useParams()
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null)
    const [evolution, setEvolution] = useState<PokemonEvolution | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const data = await getPokemonDetails(params.name as string)
                setPokemon(data)
                const evolutionData = await getPokemonEvolutions(data.id)
                setEvolution(evolutionData)
            } catch (error) {
                console.error("Failed to retrieve date")
                setError("Pokemon not found")
            } finally {
                setLoading(false)
            }
        }
        fetchPokemon()
    }, [params.name])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!pokemon || !evolution) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <h1>Pokemon Evolutions</h1>
            <div>
                <h3>Evolutions:</h3>
                <ul>
                    {evolution.chain.evolves_to.map((evo) => (
                        <li key={evo.species.name}>
                            <Link href={`/pokedex/${evo.species.name}`}>
                                {evo.species.name.charAt(0).toUpperCase() + evo.species.name.slice(1)}
                                
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}