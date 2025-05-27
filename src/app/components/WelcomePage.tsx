import Link from "next/link";
import React from "react";

export default function WelcomePage() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-center">
                <h1>Welcome to the PokeTrainer</h1>
                <p>This is a beginner friendly site to help you learn about Pokemon</p>
            </div>
            <div className="flex flex-col items-center justify-center ">
                <div className="flex gap-2">
                    <Link href="/search" className="bg-blue-500 text-white p-2 rounded-md">Search For Pokemon</Link>
                    <Link href="/pokedex" className="bg-red-500 text-white p-2 rounded-md">Pokedex</Link>
                    <Link href="/generation" className="bg-blue-500 text-white p-2 rounded-md">Generation</Link>
                    <Link href="information"></Link>
                </div>
            </div>
        </div>
    )
}