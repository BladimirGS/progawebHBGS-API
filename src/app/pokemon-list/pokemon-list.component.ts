import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  localPokemonList: Pokemon[] = [];
  loading = true;
  currentPage = 1;
  pageSize = 5;
  sortDirection: 'asc' | 'desc' = 'asc';
  sortBy: 'id' | 'name' = 'id';
  searchTerm: string = '';
  filteredPokemonList: Pokemon[] = [];
  tempPokemon: Pokemon = { id: 0, name: '', image: '' };
  selectedPokemon: Pokemon | null = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemon();
  }

  fetchPokemon(): void {
    this.pokemonService.getPokemonList(100).subscribe({
      next: (response) => {
        this.pokemonList = response.results.map((pokemon, index) => ({
          ...pokemon,
          id: index + 1,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        }));

        this.filteredPokemonList = [...this.pokemonList];
        this.updateLocalPokemonList();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Pokémon:', error);
        this.loading = false;
      },
    });
  }

  updateLocalPokemonList() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.localPokemonList = this.filteredPokemonList.slice(start, end);

    this.sortList();
  }

  openEditModal(index: number): void {
    this.tempPokemon = { ...this.localPokemonList[index] };
  }

  savePokemonChanges(): void {
    const filteredIndex = this.filteredPokemonList.findIndex(
      (pokemon) => pokemon.id === this.tempPokemon.id
    );

    if (filteredIndex !== -1) {
      this.filteredPokemonList[filteredIndex] = { ...this.tempPokemon };
      this.updateLocalPokemonList();
    }
  }

  openViewMoreModal(index: number): void {
    const pokemon = this.localPokemonList[index];
    this.pokemonService.getPokemonDetails(pokemon.id).subscribe({
      next: (details) => {
        this.selectedPokemon = {
          ...pokemon,
          abilities: details.abilities.map(
            (ability: any) => ability.ability.name
          ),
          type: details.types.map((type: any) => type.type.name).join(', '),
          height: details.height,
          weight: details.weight,
        };
      },
      error: (err) => {
        console.error('Error fetching Pokemon details:', err);
      },
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPokemonList = this.pokemonList.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(term) ||
        pokemon.id.toString().includes(term)
    );

    this.currentPage = 1;
    this.updateLocalPokemonList();
  }

  goToFirstPage(): void {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.updateLocalPokemonList();
    }
  }

  goToLastPage(): void {
    const lastPage = Math.ceil(this.filteredPokemonList.length / this.pageSize);
    if (this.currentPage !== lastPage) {
      this.currentPage = lastPage;
      this.updateLocalPokemonList();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateLocalPokemonList();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateLocalPokemonList();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPokemonList.length / this.pageSize);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(
      this.startIndex + this.pageSize,
      this.filteredPokemonList.length
    );
  }

  get showingMessage(): string {
    const start = this.startIndex + 1;
    const end = Math.min(this.endIndex, this.filteredPokemonList.length);
    const total = this.filteredPokemonList.length;

    return `Showing ${start} to ${end} of ${total} entries`;
  }

  sortList() {
    this.localPokemonList.sort((a, b) => {
      let compareA = a[this.sortBy];
      let compareB = b[this.sortBy];

      if (typeof compareA === 'string' && typeof compareB === 'string') {
        compareA = compareA.toLowerCase();
        compareB = compareB.toLowerCase();
      }

      if (this.sortDirection === 'asc') {
        return compareA > compareB ? 1 : compareA < compareB ? -1 : 0;
      } else {
        return compareA < compareB ? 1 : compareA > compareB ? -1 : 0;
      }
    });
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortList();
  }

  changeSortField(field: 'id' | 'name') {
    if (this.sortBy === field) {
      this.toggleSortDirection();
    } else {
      this.sortBy = field;
      this.sortDirection = 'asc';
    }
    this.sortList();
  }

  confirmDeletePokemon(index: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Encuentra el Pokémon a eliminar basado en la lista local
        const pokemonToDelete = this.localPokemonList[index];

        // Elimina el Pokémon de la lista global filtrada
        this.filteredPokemonList = this.filteredPokemonList.filter(
          (pokemon) => pokemon.id !== pokemonToDelete.id
        );

        // Recalcula la lista visible
        this.updateLocalPokemonList();

        // Si la página actual está vacía después de eliminar, retrocede una página
        if (this.localPokemonList.length === 0 && this.currentPage > 1) {
          this.currentPage--;
          this.updateLocalPokemonList();
        }

        Swal.fire('Deleted!', 'The Pokémon has been deleted.', 'success');
      }
    });
  }
}
