import { NextResponse } from 'next/server';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit') || '20';
        const offset = searchParams.get('offset') || "0";

        const response = await fetch(
            `${POKEMON_API_URL}/pokemon?limit=${limit}&offset=${offset}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch Pokemon data');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Pokemon data' },
            { status: 500 }
        );
    }
}