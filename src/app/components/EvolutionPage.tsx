
import { useParams } from "next/navigation";
import { getPokemonSpecies, getPokemonDetails, PokemonSpecies, PokemonDetails } from "../../../services/pokemon";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface EvolutionChain {
    species: {
        name: string;
        url: string;
    };
    evolves_to: EvolutionChain[];
}

export default function PokemonEvolutions() {
    const params = useParams()
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null)
    const [species, setSpecies] = useState<PokemonSpecies | null>(null)
    const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                // First get the Pokemon details
                const pokemonData = await getPokemonDetails(params.name as string);
                setPokemon(pokemonData);

                // Then get the species data which contains the evolution chain URL
                const speciesData = await getPokemonSpecies(pokemonData.id);
                setSpecies(speciesData);

                // Extract the evolution chain ID from the URL
                const evolutionChainId = speciesData.evolution_chain.url.split('/').slice(-2, -1)[0];
                
                // Fetch the evolution chain data
                const evolutionResponse = await fetch(speciesData.evolution_chain.url);
                if (!evolutionResponse.ok) {
                    throw new Error('Failed to fetch evolution chain');
                }
                const evolutionData = await evolutionResponse.json();
                setEvolutionChain(evolutionData.chain);
            } catch (error) {
                console.error("Failed to retrieve data:", error);
                setError("Failed to load evolution data");
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonData();
    }, [params.name]);

    const renderEvolutionChain = (chain: EvolutionChain) => {
        return (
            <div key={chain.species.name} className="flex items-center">
                <Link 
                    href={`/pokedex/${chain.species.name}`}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                    <div className="text-center">
                        <p className="font-semibold capitalize">
                            {chain.species.name}
                        </p>
                    </div>
                </Link>
                {chain.evolves_to.length > 0 && (
                    <>
                        <div className="mx-2 text-gray-500">→</div>
                        <div className="flex items-center">
                            {chain.evolves_to.map((evolution) => renderEvolutionChain(evolution))}
                        </div>
                    </>
                )}
            </div>
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!pokemon || !evolutionChain) {
        return <div>No data available</div>;
    }

    return (
        <div>
            
            <div>
                <h3>Evolutions:</h3>
                <ul>
                {renderEvolutionChain(evolutionChain)}
                </ul>
            </div>
        </div>
    );
}