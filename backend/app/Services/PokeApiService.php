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

    /**
     * Fetch a single Pokémon's full detail by its URL.
     */
    public function getPokemonByUrl(string $url): array
    {
        $response = Http::get($url);

        $response->throw();

        return $response->json();
    }

    public function getPokemonsWithDetails(int $page = 1, int $limit = 20): array
    {
        // Call list API
        $list = $this->getPokemons($page, $limit);
        $results = $list['results'] ?? [];

        $detailedResults = [];

        // Loop results
        foreach ($results as $pokemon) {
            if (! isset($pokemon['url'])) {
                continue;
            }

            $detail = $this->getPokemonByUrl($pokemon['url']);

            // Pick fields from the detail JSON
            $name = $detail['name'] ?? $pokemon['name'] ?? null;

            // Image: sprites.other["official-artwork"].front_default
            $image = $detail['sprites']['other']['official-artwork']['front_default']
                ?? $detail['sprites']['front_default']
                ?? null;

            // Types: ["grass", "poison", ...]
            $types = [];
            foreach ($detail['types'] ?? [] as $typeEntry) {
                if (isset($typeEntry['type']['name'])) {
                    $types[] = $typeEntry['type']['name'];
                }
            }

            // Push into results array
            $detailedResults[] = [
                'name' => $name,
                'image' => $image,
                'types' => $types,
                'height' => $detail['height'] ?? null,
                'weight' => $detail['weight'] ?? null,
            ];
        }

        //Return final structure
        return [
            'count' => $list['count'] ?? 0,
            'next' => $list['next'] ?? null,
            'previous' => $list['previous'] ?? null,
            'results' => $detailedResults,
        ];
    }
}