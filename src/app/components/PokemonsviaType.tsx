import React, { useState } from "react";
import { TypeInformation } from "../../../services/information";

export default function PokemonByType() {
  const [type, setType] = useState<TypeInformation | null >(null);
  

  return (
    <div>
      Pokemon By Type here
    </div>
  )
}