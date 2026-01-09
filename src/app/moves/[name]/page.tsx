'use client'
import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MoveInformation, getMoveInfo}  from "../movesInfo";
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

      <div>
        <ul> {move?.name.charAt(0).toUpperCase() + move?.name.slice(1)}
          <li>

          </li>
        </ul>
      </div>

    </div>
  )
}