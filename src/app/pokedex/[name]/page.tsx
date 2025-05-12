'use client'

import { getPokemonDetails, PokemonDetails } from "../../../../services/pokemon"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function Pokemon() {
  const params = useParams()
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonDetails(params.name as string);
        setPokemon(data)
      } catch (error) {
        console.error('Error fetching Pokemon Details')
        setError('Pokemon Not Found')
      } finally {
        setLoading(false)
      }
    };
    fetchPokemon()
  }, [params.name])

  if (loading) {
    return (
      <div>
        <div> </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        {error}
      </div>
    )
  }

  if (!pokemon) {
    return null;
  }


  return (
    <div className="">
      <header className="flex justify-center items-center w-full bg-red-600">
        <Image src="/pokeTrainer.png" alt="Pokemon" width={300} height={300} className="m-auto h-auto" />
      </header>
      <Link href={`/pokedex`} className="underline pl-1 pt-1">
        Go Back
      </Link>

      <div className="flex justify-center">
        <div className="">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-2xl">Normal</h1>
            <Image
              className=""
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={200}
              height={200}
            />
            <h1 className="text-2xl font-bold">Shiny</h1>
            <Image
              src={pokemon.sprites.front_shiny}
              alt={pokemon.name}
              width={200}
              height={200}
            />
          </div>

          <div className="border p-3 m-3">
            <h1 className="text-center">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} #{pokemon.id}</h1>
            <div className="flex justify-between">
              <p className="">
                Height: {pokemon.height}
              </p>
              <p>
                Weight: {pokemon.weight}
              </p>
            </div>
            <p className="">
              Types: {pokemon.types.map((type, index) => (
                <span key={index}>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}{index < pokemon.types.length - 1 ? ', ' : " "}</span>
              ))}
            </p>
            <p className="">
              Stats: {pokemon.stats.map((stat, index) => (
                <span className="flex" key={index}>{stat.stat.name}: {stat.base_stat}</span>
              ))}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}