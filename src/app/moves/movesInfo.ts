const POKEMON_API_URL = 'https://pokeapi.co/api/v2';


export interface MoveInformation {
  accuracy: number;
  contest_type: {
    name: string;
  },
  damage_class: {
    name: string
  };
  effect_entries: {
    effect: string
  }[],
  learned_by_pokemon: {
    name: string
    url: string
  }[],
  name: string;
  power: number;
  pp: number;
  type: {
    name: string
  }

}

export interface Moves {
  name: string
  url: string
}

export interface MoveList {
  count: number;
  next: string;
  previous: string | null;
  results: Moves[];
}




export async function getAllMoves(limit: number = 30, offset: number = 0): Promise<MoveList> {
  const response = await fetch(`${POKEMON_API_URL}/move?offset=${offset}&limit=${limit}`)

  if (!response.ok) {
    throw new Error("Failed to retrieve moves")
  }

  return response.json()
}

export async function getMoveInfo(IdorName: number | string) {
  const response = await fetch(`${POKEMON_API_URL}/move/${IdorName}`)

  if (!response.ok) {
    throw new Error("Failed to retrive move information")
  }

  return response.json()
}

