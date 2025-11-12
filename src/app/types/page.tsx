'use client'

import { TypeInfo } from "../../../services/information";
import TypeList from "../components/TypeList";
import Link from "next/link";
import Image from "next/image";


export default function TypePage() {


  return (
    <div>
      <header className="flex justify-center items-center w-full bg-red-600">
                <Image src="/pokeTrainer.png" alt="Pokemon" width={300} height={300} />
                <Link href="/">Home</Link>
            </header>
      
      <TypeList />
    </div>
  )
}