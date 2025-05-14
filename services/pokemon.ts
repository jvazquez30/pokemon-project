const POKEMON_API_URL = 'https://pokeapi.co/api/v2';

export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export interface PokemonDetails {
    name: string;
    id: number;
    sprites: {
        front_default: string;
        front_shiny: string;
    };
    types: {
        type: {
            name: string;
        };
    }[];
    height: number;
    weight: number;
    stats: {
        stat: {
            name: string;
        };
        base_stat: number;
    }[];
}

export interface PokemonEvolution {
    id: number;
    chain: {
        species: {
            name: string
        },
        evolves_to: {
            species: {
                name: string
            },
            evolution_details: {
                trigger: string
            },
            evolves_to: {
                species: {
                    name: string
                }
            }[],
        }[],
    },

}

export interface PokemonSpecies {
    id: number;
    name: string;
    evolution_chain: {
        url: string
    }
}

export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
    const response = await fetch(
        `${POKEMON_API_URL}/pokemon?offset=${offset}&limit=${limit}`
    );

    if (!response.ok) {
        throw new Error('Failed to retrieve Pokemon List');

    }

    return response.json();
}

export async function getPokemonDetails(name: string) {
    const response = await fetch(`${POKEMON_API_URL}/pokemon/${name}`);

    if (!response.ok) {
        throw new Error(`Failed to retrieve details for Pokemon: ${name}`);
    }

    return response.json();
}

export async function getPokemonEvolutions(id: number) {
    const speciesResponse = await fetch(`${POKEMON_API_URL}/evolution-chain/${id}`);
    if (!speciesResponse.ok) {
        throw new Error(`Failed to retrieve species details for id: ${id}`);
    }
    return speciesResponse.json();
} 
 export async function getPokemonSpecies(idOrName: number | string): Promise<PokemonSpecies> {
    const response = await fetch(`${POKEMON_API_URL}/pokemon-species/${idOrName}`);

    if (!response.ok) {
        throw new Error(`Failed to retrieve species details for; ${idOrName}`)
    }

    return response.json();
 }