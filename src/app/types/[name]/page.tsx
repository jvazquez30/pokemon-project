"use client"
import { TypeInformation, getTypeInfo } from "../../../../services/information"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"




export default function TypePage() {
  const params = useParams()
  const [type, setType] = useState<TypeInformation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)


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


  const TypeName = type.name;
  const DamageType = type.move_damage_class.name;
  const DoubleDmgFrom = type.damage_relations.double_damage_from;
  const DoubleDmgTo = type.damage_relations.double_damage_to;
  const HalfDmgFrom = type.damage_relations.half_damage_from;
  const HalfDmgTo = type.damage_relations.half_damage_to;
  const NoDmgFrom = type.damage_relations.no_damage_from;
  const NoDmgTo = type.damage_relations.no_damage_to

  return (
    <div className="items-center">
      <header className="flex justify-center items-center w-full bg-red-600">
        <Image src="/pokeTrainer.png" alt="Pokemon" width={300} height={300} className="m-auto h-auto" />
        <Link href={`/pokedex`} className="underline pl-1 pt-1">
          Go Back
        </Link>
      </header>

      <div className="flex-col ">
        <h1 className="text-4xl font-extrabold text-center">
          {TypeName.charAt(0).toUpperCase() + type.name.slice(1)} <span className="text-gray-500">(type)</span>
        </h1>

        <div className="flex">
          <div>
            <h1>Double Damage From:</h1>
            {DoubleDmgFrom.map((type, index) => (
              <p key={index} className={`type-${type.name}`}>{type.name}</p>
            ))}
          </div>

          <div>
            <div>
              <h1>Double Damage To</h1>
              {DoubleDmgTo.map((type, index) => (
                <p key={index} className={`type-${type.name}`}>{type.name}</p>
              ))}
            </div>
          </div>

          <div>
            <div>
              <h1>Half Damage From</h1>
              {HalfDmgFrom.map((type, index) => (
                <p key={index} className={`type-${type.name}`}>{type.name}</p>
              ))}
            </div>
          </div>

          <div>
            <div>
              <h1>Half Damage To</h1>
              {HalfDmgTo.map((type, index) => (
                <p key={index} className={`type-${type.name}`}>{type.name}</p>
              ))}
            </div>
          </div>

          <div>
            <div>
              <h1>No Damage From</h1>
              {NoDmgFrom.map((type, index) => (
                <p key={index} className={`type-${type.name}`}>{type.name}</p>
              ))}
            </div>
          </div>

          <div>
            <div>
              <h1>No Damage To</h1>
              {NoDmgTo.map((type, index) => (
                <p key={index} className={`type-${type.name}`}>{type.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}