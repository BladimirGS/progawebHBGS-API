export interface Pokemon {
  id: number;
  name: string;
  image: string;
  abilities?: string[];
  type?: string;
  height?: number;
  weight?: number; 
}

export interface PokemonApiResponse {
  results: Pokemon[];
}
