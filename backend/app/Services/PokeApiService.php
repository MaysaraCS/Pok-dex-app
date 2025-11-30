<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

// Step 3: Wrap that HTTP call in a service class
class PokeApiService
{
    // 1. Concept: how to fetch data from a website (PokeAPI)
    // Step 1: Know the external API

    private const BASE_URL = 'https://pokeapi.co/api/v2';

    /**
     * Fetch a paginated list of Pokémon from the external PokeAPI.
     */
    public function getPokemons(int $page = 1, int $limit = 20): array
    {
        // limit = how many Pokémon per request 
        // offset = how many records to skip from the start

        $page = max($page, 1);
        $limit = max(min($limit, 100), 1); // limit between 1 and 100

        $offset = ($page - 1) * $limit;

        // Step 2: Use Laravel’s HTTP client to call the website
        $response = Http::get(self::BASE_URL . '/pokemon', [
            'limit' => $limit,
            'offset' => $offset,
        ]);

        // Throw if the external API failed
        $response->throw();

        return $response->json();
    }
}
