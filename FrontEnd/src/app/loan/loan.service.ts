import { Injectable } from '@angular/core';
import { Pageable } from '../core/model/page/Pageable';
import { Observable, of } from 'rxjs';
import { LoanPage } from './model/loanPage';
//import { LOAN_DATA } from './model/mock-loan';
import { Loan } from './model/loan';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Game } from '../game/model/Game';
import { Client } from '../client/model/Client';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  // getClients(client) {
  //   throw new Error('Method not implemented.');
  // }
  // getGames(game): any {
  //   throw new Error('Method not implemented.');
  // }

  // private games : Game[]
  // private clientsName: Client[]
  // private arrLoans 
 

  constructor(
    private http: HttpClient
) { }

private baseUrl = 'http://localhost:8080/loan';


getLoans(pageable: Pageable, game?: string, client?: string): Observable<LoanPage> {
  const body = {
  pageable: pageable,
  game: game,
  client: client
  };
  return this.http.post<LoanPage>(this.baseUrl, body); 
}
  // /**
  //  * Obtener préstamos con filtros y paginación
  //  */
  // getLoans(pageable: Pageable, filters: any): Observable<LoanPage> {
  //   const payload = {
  //     pageable: pageable,
  //     filters: filters
  //   };

  //   return this.http.post<LoanPage>(this.apiUrl, payload).pipe(
  //     catchError(this.handleError)
  //   );
  // }
// getLoans(pageable: Pageable, gameId?: number, clientId?: number, date?: Date): Observable<LoanPage> {
//   let url = this.baseUrl;
//   const params = [];
//   if (gameId) params.push(`gameId=${gameId}`);
//   if (clientId) params.push(`clientId=${clientId}`);
//   if (date) {
//       // Formatea la fecha a 'yyyy-MM-dd' antes de agregarla como parámetro
//       const formattedDate = this.TypeDate(date);
//       params.push(`date=${formattedDate}`);
//   }
//   if (params.length) url += '?' + params.join('&');
//   return this.http.post<LoanPage>(url, { pageable: pageable });
//TypeDate(date: Date) : string { 
  //const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  //return date.toLocaleDateString('en-CA', options);
//}
// }
// getGames(game?: number, client?: number): Observable<Loan[]> {
//   return this.http.get<Loan[]>(this.composeFindUrl(game, client));
// }
// private composeFindUrl(game?: number, client?: number): string {
//   const params = new URLSearchParams();
//   if (game) {
//     params.set('game', game.toString());
//   }  
//   if (client) {
//       params.set('client', client.toString());
//   }
//   const queryString = params.toString();
//   return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
// }
// saveLoan(loan: Loan): Observable<void> {
//   const { id } = loan;
//   const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;

//   return this.http.put<void>(url, loan);
// }


saveLoan(loan: Loan): Observable<Loan> {
    if (loan.id) {
      return this.http.put<Loan>(`${this.baseUrl}/${loan.id}`, loan);
    } else {
      return this.http.post<Loan>(this.baseUrl, loan);
    }
  }

deleteLoan(idLoan : number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${idLoan}`);
}   

}
