import { useEffect, useState } from "react";
import { TypesList, getTypesList } from "../../../services/information";
import Link from "next/link";


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
    <div className="flex justify-center">
      <div className="justify-around">
        <h1 className="">Different types of pokemon</h1>
        {types ? (
          <ul className="grid grid-cols-2 ">
            {types.results.map((type) => (
              <li key={type.name} className={`type-${type.name} border border-gray-500 rounded-md m-1.75 text-center text-sm font-semibold text-shadow-lg`}>
                <Link href={`/types/${type.name}`}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading types...</p>
        )}

      </div>

    </div>
  )
}