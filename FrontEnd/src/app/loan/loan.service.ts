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
