import { Injectable } from '@angular/core';
import { Pageable } from '../core/model/page/Pageable';
import { Observable, of } from 'rxjs';
import { LoanPage } from './model/loanPage';
import { LOAN_DATA } from './model/mock-loan';
import { Loan } from './model/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private games : string[]
  private clientsName: string []
  private arrLoan = LOAN_DATA
  constructor() { 
    this.games = []
    this.clientsName =[]
  
  }

  

  getLoans(pageable: Pageable): Observable<LoanPage> {
      return of(LOAN_DATA);
  }

  saveLoan(loan: Loan): Observable<void> {
      return of(null);
  }

  deleteLoan(id: number): Observable<void> {
      return of(null);
  }
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
