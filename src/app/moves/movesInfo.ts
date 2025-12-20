const POKEMON_API_URL = 'https://pokeapi.co/api/v2';


export interface MoveInformation {
  name: string
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




export async function getAllMoves(limit: number = 30, offset: number = 0): Promise<MoveList>  {
  const response = await fetch(`${POKEMON_API_URL}/move?offset=${offset}&limit=${limit}`) 

    if (!response.ok) {
      throw new Error("Failed to retrieve moves")
    }

    return response.json()
} 

