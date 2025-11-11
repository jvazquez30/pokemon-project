const POKEMON_API_URL = 'https://pokeapi.co/api/v2';

export interface GenerationInfo {
    id: number
    main_region: {
        name: string
    },
    names: {
        name: string
    }[],
    pokemon_species: {
        name: string
    }[],
    version_groups: {
        name: string
    }

}

export interface TypeList {
    count: number
    results: {
        name: string
    }[]
}

export interface TypeInfo {
    id: number,

    


}

export async function getGenerations(IdorName: number | string) {
    const response = await fetch(`${POKEMON_API_URL}/generation/${IdorName}/`)

    if (!response.ok) {
        throw new Error(`Failed to retrieve Generation: ${IdorName}`)
    }

    return response.json()
}

export async function getTypesList() : Promise<TypeList>  {
    const response = await fetch(`${POKEMON_API_URL}/type/`)

    if (!response.ok) {
        throw new Error(`Failed to retrieve types`)
    }

    return response.json()
}


export async function getTypes(id: number) {
    const response = await fetch(`${POKEMON_API_URL}/type/${id}/`)

    if (!response.ok) {
        throw new Error(`Failed to retrieve type ${id}`)
    }

    return response.json()
}