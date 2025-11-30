<?php

use App\Http\Controllers\Api\PokemonController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the framework and are all assigned to the "api"
| middleware group. Make something great!
|
*/

// Step 5: Register the route in api
Route::get('/pokemons', [PokemonController::class, 'index']);