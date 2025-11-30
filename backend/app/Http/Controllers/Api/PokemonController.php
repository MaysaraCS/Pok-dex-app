<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PokeApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

// Step 4: Create a controller method for /api/pokemons
class PokemonController extends Controller
{
    public function __construct(private readonly PokeApiService $pokeApiService)
    {
    }

      //Handle GET /api/pokemons
      // updated function ->> updated index to use getPokemonsWithDetails

        public function index(Request $request): JsonResponse
    {
        // Read page and limit from the query string.
        $page = (int) $request->query('page', 1);
        $limit = (int) $request->query('limit', 20);

        // Call the service to get list + per-Pokémon details merged
        $data = $this->pokeApiService->getPokemonsWithDetails($page, $limit);

        // Directly return the transformed structure
        return response()->json($data);
    }
}