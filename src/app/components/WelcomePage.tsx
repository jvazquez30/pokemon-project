import Link from "next/link";
import React from "react";

export default function WelcomePage() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-center">
                <h1 className="font-bold text-4xl ">Welcome to the PokeTrainer</h1>
                <p>This is a beginner friendly site to help you learn about Pokemon</p>
            </div>
            <div className="flex items-center justify-center ">
                <div className="gap-2 grid grid-cols-1">
                    <Link href="/search" className="bg-blue-500 text-white p-2 rounded-md text-center">Search For Pokemon</Link>
                    <Link href="/pokedex" className="bg-red-500 text-white p-2 rounded-md text-center">Pokedex</Link>
                    <Link href="/generation" className="bg-blue-500 text-white p-2 rounded-md text-center">Generation</Link>
                    <Link href="/types" className="bg-blue-500 text-white p-2 rounded-md text-center">Types</Link>
                    <Link href='/moves' className="bg-blue-500 text-white p-2 rounded-md text-center">Moves</Link>
                    <Link href='/items' className="bg-blue-500 text-white p-2 rounded-md text-center">Items</Link>
                </div>
            </div>
        </div>
    )
}