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

    /**
     * Handle GET /api/pokemons
     */
    public function index(Request $request): JsonResponse
    {
        // Read page and limit from the query string.
        $page = (int) $request->query('page', 1);
        $limit = (int) $request->query('limit', 20);

        // Call the service
        $data = $this->pokeApiService->getPokemons($page, $limit);

        return response()->json([
            'count' => $data['count'] ?? 0,
            'next' => $data['next'] ?? null,
            'previous' => $data['previous'] ?? null,
            'results' => $data['results'] ?? [],
        ]);
    }
}