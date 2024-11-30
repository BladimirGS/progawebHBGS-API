import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/users';

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método de autenticación
  authenticate(email: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          // Guardar la información del usuario en localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return !!user;
      })
    );
  }

  // Método para obtener el usuario actual desde localStorage
  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // Método para cerrar sesión y eliminar la información del usuario
  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
