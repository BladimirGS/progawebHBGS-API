import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonApiResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de Pokémon
  getPokemonList(limit: number): Observable<PokemonApiResponse> {
    return this.http.get<PokemonApiResponse>(`${this.apiUrl}?limit=${limit}`);
  }

  getPokemonDetails(id: number) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }  
}
