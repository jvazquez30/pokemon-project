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
    <div className="flex">
      <h1 className="">Different types of pokemon</h1>
      {types ? (
        <ul className="">
          {types.results.map((type) => (
            <li key={type.name} className={`type-${type.name} border rounded-md  ` }>
              {type.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading types...</p>
      )}
      
    </div>
  )
}