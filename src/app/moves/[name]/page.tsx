'use client'
import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MoveInformation, getMoveInfo } from "../movesInfo";
import Link from "next/link";
import Image from "next/image";




export default function MoveInfo() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [move, setMove] = useState<MoveInformation | null>(null);
  const params = useParams()

  useEffect(() => {
    const fetchMoveInfo = async () => {
      try {
        const data = await getMoveInfo(params.name as string);
        setMove(data)
      } catch (error) {
        console.error("Failed to fetch move information")
        setError("Move info not found")
      } finally {
        setLoading(false)
      }
    };
    fetchMoveInfo()
  }, [params.name])



  if (loading) {
    return <div>
      Loading....
    </div>
  }

  if (error) {
    return <div> Error: {error}</div>
  }

  if (!move) {
    return <div> No move info found</div>
  }



  return (
    <div>
      <header className="flex justify-center items-center w-full bg-red-600">
        <Image src="/pokeTrainer.png" alt="Pokemon" width={300} height={300} className="m-auto h-auto" />
        <Link href={`/moves`} className="underline pl-1 pt-1">
          Go Back
        </Link>
      </header>

      <div className="flex-col text-center  ">
        <div className="m-2">
          <h1 className="text-3xl">{move?.name.charAt(0).toUpperCase() + move?.name.slice(1)}</h1>
          <ul className="">
            <li>
              Effect: {move.effect_entries[1].effect}
            </li>
            <li>
              Type: {move.type.name.charAt(0).toUpperCase() + move.type.name.slice(1)}
            </li>
            <li>
              Damage Class: {move.damage_class.name.charAt(0).toUpperCase() + move.damage_class.name.slice(1)}
            </li>
            <li>
              Accuracy: {move.accuracy ? move.accuracy : "-"}
            </li>
            Power: {move.power ? move.power : "-"}
            <li>
              PP: {move.pp}
            </li>
          </ul>
        </div>

        <div className="">
          <h1 className="p-1 text-3xl">Learned By Pokemon:</h1>
          <ul className="grid grid-cols-3">
            {move.learned_by_pokemon.map((pokemon, index) => (
              <li key={index} className="col">
                <Link href={`/pokedex/${pokemon.name}`}>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}