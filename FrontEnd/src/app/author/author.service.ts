import { Injectable } from '@angular/core';
import { Pageable } from '../core/model/page/Pageable';
import { Observable, of } from 'rxjs';
import { AuthorPage } from './model/AuthorPage';
import { Author } from './model/Author';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/author';

  getAuthors(pageable: Pageable): Observable<AuthorPage>{

    return this.http.post<AuthorPage>(this.baseUrl, {pageable : pageable});
  }

  
  saveAuthor(author: Author) : Observable<Author>{
    const {id} = author;
    //usamos el método para alta y modificación, según p/a de id(aqui, modificación:alta)
    const url = id ? `${this.baseUrl}/${id}`: this.baseUrl;
    return this.http.put<Author>(url, author);
  }

  deleteAuthor(idAuthor: number) : Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${idAuthor}`);
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl);
  }

}
