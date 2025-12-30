"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MoveList, getAllMoves } from "./movesInfo";
import { useState, useEffect } from "react";



export default function MovesPage() {
  const [moves, setMoves] = useState<MoveList | null>(null);

  useEffect(() => {
    async function fetchMoves() {
      try {
        const data = await getAllMoves();
        setMoves(data)
      } catch (error) {
        console.error("Failed to get moves data")
      }
    }
    fetchMoves()
  }, [])


  
  return (

    <div>
      <header className="flex justify-center items-center w-full bg-red-600">
        <Image src="/pokeTrainer.png" alt="Pokemon" width={300} height={300} />
        <Link href="/">Home</Link>
      </header>

      <div className="flex justify-center">
        <h1 className=" grid grid-cols-2">
        {moves ? (
          moves.results.map((move) => (
            <Link key={move.name} href={`/moves/${move.name}`} className="p-2 m-1">{move.name.toUpperCase().charAt(0) + move.name.slice(1)}</Link>
          ))
        ) : (
          <p>Loading Moves...</p>
        )}
        </h1>
      </div>
    </div>

  )
}