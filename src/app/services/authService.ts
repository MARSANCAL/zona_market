
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // ... otros métodos y propiedades

  isUserRegistered(userCredentials: { nombre: string; password: string }): boolean {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    return (
      storedUserData &&
      storedUserData.nombre === userCredentials.nombre &&
      storedUserData.password === userCredentials.password
    );
  }
}
