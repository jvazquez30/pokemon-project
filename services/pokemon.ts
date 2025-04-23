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

export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
    const response = await fetch(
        `${POKEMON_API_URL}/pokemon?limit=${limit}&offset${offset}`
    );

    if (!response.ok) {
        throw new Error('Failed to retrieve Pokemon List');

    }

    return response.json()
}

export async function getPokemonDetails(name: string) {
    const response = await fetch(`${POKEMON_API_URL}/pokemon/${name}`);

    if (!response.ok) {
        throw new Error(`Failed to retrieve details for Pokemon: ${name}`);
    }

    return response.json();
}
