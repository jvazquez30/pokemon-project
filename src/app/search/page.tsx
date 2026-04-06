'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPokemonDetails, PokemonDetails } from "../../../services/pokemon";
import Image from "next/image";
import Link from "next/link";

type PokemonSuggestion = { name: string; id: number };

const fetchAllPokemon = async (): Promise<PokemonSuggestion[]> => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await res.json();
    return data.results.map((pokemon: { name: string; url: string }) => {
        const id = parseInt(pokemon.url.split('/').filter(Boolean).pop() ?? '0');
        return { name: pokemon.name, id };
    });
}

export default function SearchPage() {
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [allPokemon, setAllPokemon] = useState<PokemonSuggestion[]>([]);
    const [suggestions, setSuggestions] = useState<PokemonSuggestion[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const justSelected = useRef(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    // Fetch all pokemon names on mount
    useEffect(() => {
        fetchAllPokemon().then(setAllPokemon);
    }, []);

    useEffect(() => {
        const query = searchParams.get('q')

        if (query) {
            setSearchTerm(query);
            fetchPokemon(query);
        }
    }, [searchParams]);

    useEffect(() => {
        if (justSelected.current) {
            justSelected.current = false;
            return;
        }
        if (searchTerm.length > 0) {
            const filteredPokemon = allPokemon.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setSuggestions(filteredPokemon);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, allPokemon]);


    const fetchPokemon = async (name: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPokemonDetails(name.toLowerCase());
            setPokemon(data);
        } catch (error) {
            console.error('Error fetching Pokemon details:', error);
            setError('Pokemon not found');
            setPokemon(null);
        } finally {
            setLoading(false);
        }
    }

    const handleSuggestionClick = (name: string) => {
        justSelected.current = true;
        setSearchTerm(name);
        setSuggestions([]);
        router.push(`/search?q=${encodeURIComponent(name)}`);
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <header className="flex justify-center items-center w-full bg-red-600">
                <Image src="/pokeTrainer.png" alt="Pokemon" width={300} height={300} />
                <Link href="/">Home</Link>
            </header>
            <div className="flex-col justify-center max-w-2xl">
                <div className="gap-2">
                    <h1 className="text-2xl font-bold text-center text-red-500 rounded-lg border-2 border-black p-2">Pokemon Search</h1>
                    <form onSubmit={handleSearch}>
                        <div className="gap-2 p-2 flex flex-row items-center justify-center">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search Pokemon"
                                    className="border-2 border-gray-300 rounded-md p-2"
                                />
                                {suggestions.length > 0 && (
                                    <ul className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                                        {suggestions.map(p => (
                                            <li
                                                key={p.name}
                                                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                                onClick={() => handleSuggestionClick(p.name)}
                                            >
                                                <Image
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                                                    alt={p.name}
                                                    width={32}
                                                    height={32}
                                                    className="w-8 h-8 object-contain"
                                                />
                                                {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="border-2 border-gray-300 rounded-md p-2"
                            >Search

                                {/* Suggestions dropdown */}
                            </button>
                        </div>
                    </form>
                </div>

                {loading && (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-8 text-red-500">
                        {error}
                    </div>
                )}

                {pokemon && !loading && !error && (
                    <div className="bg-gray-50 shadow-lg rounded-md p-14">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="flex items-center justify-center gap-4">
                                <h1 className="text-2xl font-bold text-center text-gray-800">
                                    Normal
                                </h1>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={160}
                                    height={160}
                                    className="w-40 h-40 object-contain"
                                />
                            </div>
                            <div className="flex items-center justify-center gap-4">
                                <h1 className="text-2xl font-bold text-center text-gray-800 p-3">
                                    Shiny{" "}
                                </h1>
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={160}
                                    height={160}
                                    className="w-40 h-40 object-contain"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <h1 className="text-2xl font-bold text-center text-gray-800">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} <span className="text-2xl font-bold text-center text-gray-800">#{pokemon.id}</span></h1>
                            <div className="flex flex-row items-center justify-center gap-4">
                                <p className="text-sm text-gray-500"> <span>Height:</span> {pokemon.height}</p>
                                <p className="text-sm text-gray-500"> <span>Weight:</span> {pokemon.weight}</p>
                                <p className="text-sm text-gray-500"> <span>Types:</span> {pokemon.types.map((type, index) => (
                                    <span key={index}>{type.type.name}{index < pokemon.types.length - 1 ? ', ' : ''}</span>
                                ))}</p>
                            </div>
                            <div className="">
                                <p className="text-sm text-gray-500"> <span>Stats:</span></p>
                                <ul>
                                    {pokemon.stats.map(stat => (
                                        <li key={stat.stat.name}
                                            className="text-sm text-gray-500">
                                            <span className="text-gray-500">{stat.stat.name}:</span> {stat.base_stat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}