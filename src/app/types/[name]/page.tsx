"use client"
import { TypeInformation, getTypeInfo } from "../../../../services/information"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"




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

  return (
    <div>
      {type.name}
      {type.move_damage_class.name}
      {type.damage_relations.double_damage_from.map((pokemon, index) => (
  <div key={index}>{pokemon.name}</div>
))}    
    </div>
  )
}