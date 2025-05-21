'use client'

import { getGenerations, GenerationInfo, } from "../../../services/information";
import { useEffect, useState } from "react";
import Image from "next/image";

const GenerationList = [
    { name: "Generation I"},
    { name: "Generation II"},
    { name: "Generation III"},
    { name: "Generation IV"},
    { name: "Generation V"},
    { name: "Generation VI"},
    { name: "Generation VII"},
    { name: "Generation VIII"},
    { name: "Generation IX"},
]




export default function Generation() {
    const [generation, setGeneration] = useState<GenerationInfo | null>(null)
    const [loading, setloading] = useState(true)
    const [error, setError] = useState<string | null >(null)

    useEffect(() => {
        const fetchGeneration = async () => {
            try {
                const data = await getGenerations(9)
                setGeneration(data)
            } catch (error) {
                console.error("Failed to retrieve Gen information", error)
                setError("Gen info not avail")
            } finally {
                setloading(false)
            }
        }
        fetchGeneration()
    }, [])

    return (
        <div>
            <header className="flex justify-center items-center w-full bg-red-600">
                <Image src="/pokeTrainer.png" alt="Pokemon" width={300} height={300} />
            </header>

            <div>
              <ul>
                {GenerationList.map((generation, index) => (
                    <li key={index}>{generation.name}</li>
                ))}
              </ul>
            </div>

            <div>
                
            </div>
        </div>
    )
}