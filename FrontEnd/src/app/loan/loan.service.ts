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


getLoans(pageable: Pageable, game?: number | null, client?: number | null): Observable<LoanPage> {
  const body = {
  pageable: pageable,
  game: game ?? null,
  client: client ?? null
  };
  return this.http.post<LoanPage>(this.baseUrl, body); 
}

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
