import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CLIENT_DATA } from '../client/model/mock-clients';
import { Pageable } from '../core/model/page/Pageable';
import { GAME_DATA } from '../game/model/mock-games';
import { Loan } from './model/loan';
import { LoanPage } from './model/loanPage';
import { LOAN_DATA } from './model/mock-loan';
import { DatePipe } from '@angular/common';

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
  getClients(): Observable<string[]> {
    return of(CLIENT_DATA.map(client => client.name));
  }

  getGames(): Observable<string[]> {
    return of(GAME_DATA.map(game => game.title));
  }
   

}
