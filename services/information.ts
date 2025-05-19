const POKEMON_API_URL = 'https://pokeapi.co/api/v2';

export interface GenerationInfo {
    id: number
    names: {
        name: string
    },
}


export async function getGenerations(IdorName: number | string) {
    const response = await fetch(`${POKEMON_API_URL}/generation/${IdorName}/`)

    if (!response.ok) {
        throw new Error(`Failed to retrieve Generation: ${IdorName}`)
    }

    return response.json()
}