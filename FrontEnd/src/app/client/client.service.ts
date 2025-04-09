import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from './model/Client';
import { CLIENT_DATA } from './model/mock-clients';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:8080/client';

  getClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.baseUrl)
  }

  saveClient(client: Client): Observable<Client> {
    if (client.id) {
      return this.http.put<Client>(`${this.baseUrl}/${client.id}`, client);
    } else {
      return this.http.post<Client>(this.baseUrl, client);
    }
  }

  deleteClient(idClient: number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${idClient}`)
  }

  // constructor(
  
  // ) { }

  // getClients(): Observable<Client[]> {
  //   return of (CLIENT_DATA);
  // }

  // saveClient(client: Client):Observable<Client>{
  //   return of (null)
  // }

  // deleteClient(idClient: number): Observable<any>{

  //   return of (null)

  // }
}
