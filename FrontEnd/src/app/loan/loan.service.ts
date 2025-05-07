import { Injectable } from '@angular/core';
import { Pageable } from '../core/model/page/Pageable';
import { Observable, of } from 'rxjs';
import { LoanPage } from './model/loanPage';
import { Loan } from './model/loan';
import { HttpClient } from '@angular/common/http';
;

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(
    private http: HttpClient
) { }

private baseUrl = 'http://localhost:8080/loan';
private baseUrlAlta =  'http://localhost:8080/loan/alta';


getLoans(pageable: Pageable, game?: number | null, client?: number | null, date?:string): Observable<LoanPage> {
  const body = {
  pageable: pageable,
  game: game ?? null,
  client: client ?? null,
  date: date ?? null
  };
  return this.http.post<LoanPage>(this.baseUrl, body); 
}

getAllLoans(){
  
  return this.http.get<Loan[]>(this.baseUrl);

}

saveLoan(loan: Loan): Observable<Loan> {
  

   const loanDto = {

     game: loan.game,
     client: loan.client,
     date1: loan.date1,
     date2: loan.date2
     };
    

      return this.http.post<Loan>(this.baseUrlAlta, loanDto);
    
  }

deleteLoan(idLoan : number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${idLoan}`);
}   

}
