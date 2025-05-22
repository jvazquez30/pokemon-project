const POKEMON_API_URL = 'https://pokeapi.co/api/v2';

export interface GenerationInfo {
    id: number
    name: string
    main_region: {
        name: string
    },
    names: {
        name: string
    }[],
    pokemon_species: {
        name: string
    }[],
    
}


export async function getGenerations(IdorName: number | string) {
    const response = await fetch(`${POKEMON_API_URL}/generation/${IdorName}/`)

    if (!response.ok) {
        throw new Error(`Failed to retrieve Generation: ${IdorName}`)
    }

    return response.json()
}