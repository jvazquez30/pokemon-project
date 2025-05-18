import { getGenerations, GenerationInfo, } from "../../../services/information";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Generation() {
    const [generation, setGeneration] = useState<GenerationInfo | null>(null)
    const [loading, setloading] = useState(true)
    const [error, setError] = useState<string | null >(null)

    useEffect(() => {
        const fetchGeneration = async () => {
            try {
                const data = await getGenerations()
            } catch (error) {

            } finally {
                setloading(false)
            }
        }
    })

    return (
        <div>
            <header className="flex justify-center items-center w-full bg-red-600">
                <Image src="/pokeTrainer.png" alt="Pokemon" width={300} height={300} />
            </header>

            <div>
                Generations Info
            </div>


        </div>
    )
}