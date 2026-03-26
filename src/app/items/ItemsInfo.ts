const POKEMON_API_URL = 'https://pokeapi.co/api/v2';

export interface Items {
  name: string;
  url: string
}

export interface ItemsList {
  count: number;
  next: string;
  previous: null;
  results: Items[]
}

export interface ItemInfo { 
  name: string;
  sprite: {
    default: string;
  },
  


}


export async function getAllItems(limit: number = 30, offset: number = 0) : Promise<ItemsList> {
  const response = await fetch(`${POKEMON_API_URL}/item?offset=${offset}&limit=${limit}`) 

  if (!response.ok) {
    throw new Error("Failed to retrieve Items")
  }

  return response.json()
}


export async function getItemInfo(IdorName: number | string) {
  const response = await fetch(`${POKEMON_API_URL}/item/${IdorName}`)

  if (!response.ok) {
    throw new Error("Failed to retrieve Item Info")
  }

  return response.json()
}
