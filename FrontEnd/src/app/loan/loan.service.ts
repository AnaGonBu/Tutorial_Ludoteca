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
  getClients(client) {
    throw new Error('Method not implemented.');
  }
  getGames(game): any {
    throw new Error('Method not implemented.');
  }

  private games : Game[]
  private clientsName: Client[]
  private arrLoans 
 

  constructor(
    private http: HttpClient
) { }

private baseUrl = 'http://localhost:8080/loan';

getLoans(pageable: Pageable): Observable<LoanPage>{

    return this.http.post<LoanPage>(this.baseUrl, {pageable : pageable});
  }

// getAllLoans(): Observable<Loan[]> {
//     this.arrLoans = this.http.get<Loan[]>(this.baseUrl);
//     return this.arrLoans;
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



  // private arrLoan = LOAN_DATA
  // constructor(
  // ) { 
  //   this.games = []
  //   this.clientsName =[]
  
  // }

  // getLoans(pageable: Pageable): Observable<LoanPage> {
  //     return of(LOAN_DATA);
  // }

  // saveLoan(loan: Loan): Observable<void> {
  //     return of(null);
  // }

  // deleteLoan(id: number): Observable<void> {
  //     return of(null);
  // }
  // getClients(): string[] {
  //   return this.arrLoan.array.forEach(element => {
  //     this.clientsName.push(element.client);
  //   return this.clientsName
  //   });
  // }   
  // getGames(): string[] {
  //   return this.arrLoan.array.forEach(element => {
  //     this.games.push(element.name);
  //   return this.games
  //   });
  // }   

}
