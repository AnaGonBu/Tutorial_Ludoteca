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

  constructor() { }

  

  getLoans(pageable: Pageable): Observable<LoanPage> {
      return of(LOAN_DATA);
  }

  saveLoan(author: Loan): Observable<void> {
      return of(null);
  }

  deleteAuthor(id: number): Observable<void> {
      return of(null);
  }
      
}
