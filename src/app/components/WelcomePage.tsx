import Link from "next/link";
import React from "react";

export default function WelcomePage() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-center">
                <h1 className="font-bold text-5xl ">Welcome to PokeTrainer</h1>
                <p>A beginner friendly site to help you learn about Pokemon</p>
            </div>
            <div className="flex items-center justify-center ">
                <div className="gap-2 grid grid-cols-2">
                    <Link href="/search" className="bg-blue-500 text-white text-shadow-md p-2 rounded-md text-center border border-black">Search For Pokemon</Link>
                    <Link href="/pokedex" className="bg-blue-500 text-white text-shadow-md p-2 rounded-md text-center border border-black">Pokedex</Link>
                    <Link href="/generation" className="bg-blue-500 text-white text-shadow-md p-2 rounded-md text-center border border-black">Generation</Link>
                    <Link href="/types" className="bg-blue-500 text-white text-shadow-md p-2 rounded-md text-center border border-black">Types</Link>
                    <Link href='/moves' className="bg-blue-500 text-white text-shadow-md p-2 rounded-md text-center border border-black">Moves</Link>
                    <Link href='/items' className="bg-blue-500 text-white text-shadow-md p-2 rounded-md text-center border border-black">Items</Link>
                </div>
            </div>
        </div>
    )
}