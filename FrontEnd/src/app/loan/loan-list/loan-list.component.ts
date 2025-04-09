import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pageable } from '../../core/model/page/Pageable';
import { MatDialog } from '@angular/material/dialog';
import { LoanService } from '../loan.service';
import { Loan } from '../model/loan';

@Component({
  selector: 'app-loan-list',
  imports: [CommonModule, 
            MatButtonModule,
            MatIconModule, 
            MatTableModule,
            MatPaginator,],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent implements OnInit {

pageNumber: number = 0;
pageSizeOptions : number []= [5,10,15]
pageSize: number = this.pageSizeOptions[0];
totalElements: number = 0;


displayedColumns: string[] = ['id', 'name', 'client', 'date1', 'date2'];
dataSource = new MatTableDataSource<Loan>();

constructor (private loanService: LoanService, public dialog: MatDialog){}

ngOnInit(): void {
  this.loadPage();
}

loadPage(event?: PageEvent){
  const pageable: Pageable = {
    pageNumber: this.pageNumber,
    pageSize: this.pageSize,
    sort: [
      {
        property: 'id',
        direction: 'ASC'
      },
    ],
  };
  if (event != null) {
    pageable.pageSize = event.pageSize
    pageable.pageNumber = event.pageIndex;
  }

  this.loanService.getLoans(pageable).subscribe((data)=>{
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
  });
}

// saveAuthor(author: Author): Observable<void> {
//   return of(null);
// }

// deleteAuthor(idAuthor: number): Observable<void> {
//   return of(null);
// }


createLoan() {
throw new Error('Method not implemented.');
}



}
