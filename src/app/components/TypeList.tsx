import { useEffect, useState } from "react";
import { TypesList, getTypesList } from "../../../services/information";


export default function TypeList() {
  const [types, setTypes] = useState<TypesList | null>(null)


  useEffect(() => {
    async function fetchTypes() {
      try {
        const data = await getTypesList();
        setTypes(data)
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    }
    fetchTypes()
  }, [])


  return (
    <div>
      <h1>Different types of pokemon</h1>
      {types ? (
        <ul>
          {types.results.map((type) => (
            <li key={type.name}>{type.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading types...</p>
      )}
      
    </div>
  )
}