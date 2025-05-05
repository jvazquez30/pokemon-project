import Link from "next/link";
import React from "react";

export default function WelcomePage() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div>
                <h1>Welcome to the PokeTrainer</h1>
                <p>This is a beginner friendly site to help you learn about Pokemon</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div>
                    <Link href="/search" className="bg-blue-500 text-white p-2 rounded-md">Search For Pokemon</Link>
                </div>
            </div>
        </div>
    )
}