import React, { useEffect, useState } from "react";
import { TypeInformation,getTypeInfo } from "../../../services/information";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PokemonByType() {
  const params = useParams()
  const [type, setType] = useState<TypeInformation | null >(null);
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
      const fetchTypeInfo = async () => {
        try {
          const data = await getTypeInfo(params.name as string);
          setType(data)
        } catch (error) {
          console.error("Failed to fetch type information")
          setError("Type not found")
        } finally {
          setLoading(false)
        }
      };
      fetchTypeInfo()
    }, [params.name])


if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!type) {
    return <div>No type data found</div>
  }

  const PokemonList = type.pokemon

  return (

    <div>
      {PokemonList.map((pokemon, index) => (
        <p key={index} className="text-black">
          <Link href={`/pokedex/${pokemon.pokemon.name}`}>
          {pokemon.pokemon.name}
          </Link>
          </p>
          
      ))}
    </div>
  )
}