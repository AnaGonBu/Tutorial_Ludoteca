import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Author } from '../model/Author';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthorService } from '../author.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pageable } from '../../core/model/page/Pageable';
import { MatDialog} from '@angular/material/dialog';
import { AuthorEditComponent } from '../author-edit/author-edit.component';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-author-list',
  imports: [CommonModule, MatButtonModule,MatIconModule, MatTableModule,MatPaginator,],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss'
})
export class AuthorListComponent implements OnInit {

  pageNumber: number = 0;
  pageSizeOptions : number []= [5,10,15]
  pageSize: number = this.pageSizeOptions[0];
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Author>();
  displayedColumns: string[] = ['id', 'name', 'nationality', 'action'];

  constructor (private authorService: AuthorService, public dialog: MatDialog){}

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

    this.authorService.getAuthors(pageable).subscribe((data)=>{
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
    });
  }




createAuthor() {
  const dialogRef = this.dialog.open(AuthorEditComponent, {
    data: {},
  });

  dialogRef.afterClosed().subscribe((result) => {
    this.ngOnInit();
  });
}


editAuthor(author: Author) {
  const dialogRef = this.dialog.open(AuthorEditComponent, {
      data: { author: author },
  });

  dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
  });
}

deleteAuthor(author: Author) {
  const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
          title: `¿Desea eliminar a ${author.name}?`,
          description: `Atención si borra el autor se perderán sus datos.<br> ¿Desea eliminarlo?`,

      },
  });

  dialogRef.afterClosed().subscribe((result) => {
      if (result) {
          this.authorService.deleteAuthor(author.id).subscribe((result) => {
              this.ngOnInit();
          });
      }
  });
}




}
