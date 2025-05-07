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
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { LoanEditComponent, MY_DATE_FORMATS } from '../loan-register/loan-edit.component';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Game } from '../../game/model/Game';
import { Client } from '../../client/model/Client';
import { ClientService } from '../../client/client.service';
import { GameService } from '../../game/game.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-loan-list',
  imports: [CommonModule, 
            MatButtonModule,
            MatIconModule, 
            MatTableModule,
            MatPaginator,
            FormsModule,
            MatInputModule,
            MatSelectModule,
            MatDatepickerModule,
            MatNativeDateModule, MatFormField ],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss',
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    {provide: DateAdapter, useClass:MomentDateAdapter, deps: [MAT_DATE_LOCALE]}
  ]
})
export class LoanListComponent implements OnInit {
filterTitle: Game;
filterClient: Client;
filterDate : Date;
clientes : Client[]
games : Game[]
loans : Loan[]

pageNumber: number = 0;
pageSize: number = 5;
totalElements: number = 10;

displayedColumns: string[] = ['id', 'game', 'client', 'date1', 'date2', 'action'];
dataSource = new MatTableDataSource<Loan>();

constructor (
  private loanService: LoanService, 
  public dialog: MatDialog, 
  private clientsService : ClientService,
  private gameService: GameService){}

ngOnInit(): void {

  this.loadPage();
  this.loadAllLoans(); 
  }
  
loadAllLoans(): void {
  this.loanService.getAllLoans().subscribe((loans) => {
  this.loans = loans;
  
  // Crear un Set basado en el nombre del cliente
  const clientNames = new Set(loans.map(loan => loan.client.name));
  this.clientes = Array.from(clientNames).map(name => loans.find(loan => loan.client.name === name).client);
  
  // Crear un Set basado en el título del juego, por si a futuro, se permite más de un préstamo
  const gameTitles = new Set(loans.map(loan => loan.game.title));
  this.games = Array.from(gameTitles).map(title => loans.find(loan => loan.game.title === title).game);
 });
  }
  

onCleanFilter(): void {
  this.filterClient =null;
  this.filterTitle = null;
  this.filterDate = null;
  this.onSearch();
  }

onSearch(): void {
    this.pageNumber=0;
    this.loadPage()
  
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
  
  const game = this.filterTitle != null ? this.filterTitle.id : null;
  const client = this.filterClient != null ? this.filterClient.id : null;
  const date = this.filterDate != null ? this.filterDate.toISOString().split('T')[0] : null;
  


  this.loanService.getLoans(pageable, game, client, date).subscribe((data)=>{
      this.dataSource.data = data.content.map(loanDto => {
        return{
          id:loanDto.id,
          game:loanDto.game,
          client:loanDto.client,
          date1:loanDto.date1,
          date2: loanDto.date2

        };
      });
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements; 

  });
}

deleteLoan(loan: Loan) {
  const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
          title: `¿Desea eliminar el préstamo de ${loan.game.title}?`,
          description: `Atención si borra el autor se perderán sus datos.<br> ¿Desea eliminarlo?`,

      },
  });

  dialogRef.afterClosed().subscribe((result) => {
      if (result) {
          this.loanService.deleteLoan(loan.id).subscribe((result) => {
            this.dialog.open(DialogConfirmationComponent, {
              data: { title: '', description: 'El préstamo se ha eliminado correctamente.', confirm: false }
              });
              this.ngOnInit();
          });
      }
  });
}

createLoan() {
  const dialogRef = this.dialog.open(LoanEditComponent, {
    data: {},
});

dialogRef.afterClosed().subscribe((result) => {
    this.ngOnInit();
});
}



}
