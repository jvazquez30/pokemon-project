'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { GenerationInfo, getGenerations } from "../../../../services/information"
import Image from "next/image"
import Link from "next/link"

// this will show the generation name

export default function GenerationPage() {
    const params = useParams()
    const [generation, setGeneration] = useState<GenerationInfo | null>(null);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchGeneration = async () => {
            try {
                const data = await getGenerations(params.name as string);
                setGeneration(data)
            } catch (error) {
                console.error('Error fetching Pokemon Details')
                setError('Pokemon Not Found')
            } finally {
                setLoading(false)
            }
        };
        fetchGeneration()
    }, [params.name])


    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if (error) {
        return (
            <h1>{error}</h1>
        )
    }

    return (
        <div>
            <header className="flex justify-center items-center w-full bg-red-600">
                <Link href={`/generation`} className="underline pl-1 pt-1">
                    Go Back
                </Link>
                <Image src="/pokeTrainer.png" alt="Pokemon" width={300} height={300} />
                <Link href={'/'} className="underline">Home</Link>
            </header>

            <div id="generationInfo">
                <h1 id="regionName">
                    {generation?.main_region.name && (
                        generation.main_region.name.charAt(0).toUpperCase() + generation.main_region.name.slice(1)
                    )} Region
                </h1>
                <div>

                </div>

            </div>

        </div>

    )
}