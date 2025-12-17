const POKEMON_API_URL = 'https://pokeapi.co/api/v2';

interface Pokemon {
    pokemon: {
        name: string
        url: string
    }
}

interface NamedResource {
    name: string
}

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

export interface TypesList {
    count: number
    results: {
        name: string
    }[]
}

export interface TypeInformation {
    damage_relations: {
        double_damage_from: NamedResource[];
        double_damage_to: NamedResource[];
        half_damage_from: NamedResource[];
        half_damage_to: NamedResource[];
        no_damage_from: NamedResource[];
        no_damage_to: NamedResource[];
    }
    move_damage_class: {
        name: string
    };
    moves: {
        name: string
    }[]
    name: string;
    pokemon: Pokemon[]
    
}

export async function getGenerations(IdorName: number | string) {
    const response = await fetch(`${POKEMON_API_URL}/generation/${IdorName}/`)

    if (!response.ok) {
        throw new Error(`Failed to retrieve Generation: ${IdorName}`)
    }

    return response.json()
}

export async function getTypesList(): Promise<TypesList> {
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

export async function getTypeInfo(IdorName: number | string) {
    const response = await fetch(`${POKEMON_API_URL}/type/${IdorName}`)

    if (!response.ok) {
        throw new Error("Failed to retrieve type")
    }

    return response.json()
}