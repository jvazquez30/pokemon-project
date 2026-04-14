'use client'
import { useState, useEffect } from "react"
import { PokemonDetails, getPokemonDetails } from "../../../services/pokemon"
import Image from "next/image";

export default function PokeRandomizer() {
  const [pokemon, setPokemon] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const ids = Array.from({ length: 3 }, () => Math.floor(Math.random() * 1025) + 1)
    const fetchPokemon = async () => {
      try {
        const data = await Promise.all(ids.map(id => getPokemonDetails(id.toString())))
        setPokemon(data)
      } catch (error) {
        console.error("Could not get id number")
        setError("Unable to load")
      } finally {
        setLoading(false)
      }
    };
    fetchPokemon()
  }, [])

  return (


    <div>
      <div>
        <ul className="flex justify-center border rounded-2xl shadow-md ">
          {pokemon.map((pokemon, index) => (
            <li key={index} className="text-sm p-4">
              #{pokemon.id} {' '}
              {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
              <Image
                className=""
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={75}
                height={75} />
            </li>
          ))}

        </ul>
      </div>
    </div>
  )
}