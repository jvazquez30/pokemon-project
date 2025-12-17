import React from "react";
import { TypeInformation, getTypeInfo } from "../../../services/information";
import { useState, useEffect  } from "react";
import { useParams } from "next/navigation";




export default function MoveByTypes() { 
  const params = useParams()
  const [type, setType] = useState<TypeInformation | null>(null)
  const [error, setError] = useState<String | null>(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchTypeInfo = async () => {
      try {
        const data = await getTypeInfo(params.name as string)
        setType(data)
      } catch (error) {
        console.error("Unable to retrieve moves")
        setError("Moves not found")
      } finally {
        setLoading(false)
      }
    }
    fetchTypeInfo()
  }, [params.name])


  const MoveList = type?.moves


if (loading) {
  return <p>Loading..</p>
}

if (error) {
  return <p>Error: {error}</p>
}

if (!type) {
  return <p>Types Not loading </p>
}






  return (
    <div>
      {MoveList?.map((move, index) => (
        <p key={index}>{move.name}</p>
      ))}
    </div>
  )
}