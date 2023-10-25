import { HttpClient , HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { Mercados } from '../clases/mercados';
import { Injectable, inject } from '@angular/core';
import {Observable, tap, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceRestService {

   http = inject(HttpClient)

   URL: string = 'http://localhost:3300';
   httpHeader ={
    headers: new HttpHeaders ({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'})
    };

  //--------GET LIST MERCADOS---
  getMercadosList(): Observable<Mercados[]>{
    return this.http.get<Mercados[]>(`${this.URL}/mercados/`).pipe(
      tap((Mercados) => console.log('Mercados obtenidos')),
      catchError(this.handleError<Mercados[]>('Get Mercados',[]))
    );
  }

   //---------Crear mercado
   addMercado(mercado:Mercados):Observable<any>{
    return this.http.post<Mercados>(`${this.URL}/mercados/`, mercado, this.httpHeader)
      .pipe(catchError(this.handleError<Mercados>('Add Mercados')))     
    }

  //----actualizar Mercado
  updateMercado(id: any, mercado: Mercados):Observable<any>{
    return this.http.put(`${this.URL}/mercados/`+id, mercado,
    this.httpHeader).pipe(
      tap((_) => console.log('mercado updated: ${id}')),
      catchError(this.handleError<Mercados[]>('Update Mercado'))
    );
  }

  //get mercado por id
  getMercadoId(id: any):Observable<Mercados[]>{
    return this.http.get<Mercados[]>(`$this.URL)/mercados/` + id).pipe(
      tap((_) => console.log(`Mercado fatched: ${id}`)),
      catchError(this.handleError<Mercados[]>(`Get Mercado id=${id}`))
    )
  }
  //----delet mercado
  deletMercado(id: any):Observable<Mercados[]>{
    return this.http.delete<Mercados[]>(`${this.URL}/mercados/` + id).pipe(
      tap((_) => console.log(`Mercado fetched: ${id}`)),
      catchError(this.handleError<Mercados[]>(`Delete Mercado`))
    )
  }
  //----funcion para manejar errores

  private handleError<T>(operation = 'operation', result?: T){
    return(error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.mesage}`);
      return of (result as T);
    };
  }
}
