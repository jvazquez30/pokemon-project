'use client'

import { getPokemonList, getPokemonDetails, PokemonDetails } from "../../../services/pokemon"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

export default function PokemonPage() {
    const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);

    //Function to load more Pokemon
    const loadMorePokemon = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        try {
            const newPokemon = await getPokemonList(20, offset);
            const newDetails = await Promise.all(
                newPokemon.results.map(pokemon => getPokemonDetails(pokemon.name))
            );

            setPokemonList(prevList => [...prevList, ...newDetails]);
            setOffset(prevOffset => prevOffset + 20); // <--- increments by 20 
            setHasMore(newPokemon.next !== null);
        } catch (error) {
            console.error("Error loading more Pokemon", error);
        } finally {
            setLoading(false)
        }
    }, [offset, loading]);

    // Intersection Observer Setup
    const lastPokemonElementRef = useCallback((node: HTMLLIElement) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMorePokemon();
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore, loadMorePokemon]);

    //Initial Load
    useEffect(() => {
        loadMorePokemon();
    }, [loadMorePokemon])

    return (
        <div className=" justify-items-center items-center">
            <header className="flex justify-center items-center w-full bg-red-600">
                <Image src="/pokeTrainer.png" alt="Pokemon" width={300} height={300} />
            </header>

            <Link href={'/'} className="underline hover:to-blue-600">
                Go Home
            </Link>

            <div className="">
                <h1 className="flex justify-center">Pokedex</h1>
                <ul className="grid lg:grid-cols-5 gap-4 grid-cols-2">
                    {pokemonList.map((pokemon, index) => (
                        <li
                            key={`${pokemon.id}-${index}`}
                            ref={index === pokemonList.length - 1 ? lastPokemonElementRef : null}
                            className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow"
                        >
                            <Link href={`/pokedex/${pokemon.name}`}>
                                <div className="flex items-center space-x-4">
                                    {pokemon.sprites.front_default ? (
                                        <Image
                                            src={pokemon.sprites.front_default}
                                            alt={pokemon.name}
                                            width={96}
                                            height={96}
                                            className="w-24 h-24 object-contain"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span className="text-gray-400">No image</span>
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-semibold">
                                            #{pokemon.id} - {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                        </p>
                                        <div className="flex gap-2 mt-1">
                                            {pokemon.types.map((type: any) => (
                                                <span
                                                    key={type.type.name}
                                                    className="px-2 py-1 text-xs rounded-full bg-gray-200"
                                                >
                                                    {type.type.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}