import Image from 'next/image';
import type { Pokemon } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
      {/* Sprite image */}
      <div className="relative h-16 w-16 flex-shrink-0">
        {pokemon.image ? (
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            className="object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded bg-gray-100 text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Name and types */}
      <div className="flex flex-1 flex-col">
        <div className="mb-1 text-lg font-semibold capitalize text-gray-800">
          {pokemon.name}
        </div>

        {/* Type badges */}
        <div className="flex flex-wrap gap-2">
          {pokemon.types.map(type => (
            <span
              key={type}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium capitalize text-blue-700"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
