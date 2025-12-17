import React from "react"; 
import Link from "next/link";
import Image from "next/image";



export default function MovesPage() {

 return (

  <div>
     <header className="flex justify-center items-center w-full bg-red-600">
                <Image src="/pokeTrainer.png" alt="Pokemon" width={300} height={300} />
                <Link href="/">Home</Link>
            </header>


    Moves will display here
  </div>

 )
}