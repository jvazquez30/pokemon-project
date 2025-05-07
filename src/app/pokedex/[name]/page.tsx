
import Link from "next/link"   
import Image from "next/image" 

export default async function Pokemon() {



    return (
        <div>
            <header className="flex justify-center items-center w-full bg-red-600">
                <Image src="/pokeTrainer.png" alt="Pokemon" width={300} height={300} />
            </header>

            <Link href={`/pokedex`}>
                Go Back
            </Link>

            <div>
            Pokemon here

            </div>
        
        </div>
    )
}