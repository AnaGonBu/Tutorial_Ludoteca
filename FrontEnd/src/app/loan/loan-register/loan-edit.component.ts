import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule, } from '@angular/material/input';
import { Loan } from '../model/loan';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoanService } from '../loan.service';
import { MatSelectModule } from '@angular/material/select';
import { Client } from '../../client/model/Client';
import { Game } from '../../game/model/Game';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule,MomentDateAdapter} from '@angular/material-moment-adapter'
import { DateAdapter,MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material/core';
import { ClientService } from '../../client/client.service';
import { GameService } from '../../game/game.service';
import { CommonModule,} from '@angular/common';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';







export const MY_DATE_FORMATS={
  parse: {
    dateInput : 'DD-MM-YYYY',
  },
  display : {
    dateInput : 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-loan-edit',
  standalone: true,
  imports: [MatMomentDateModule,CommonModule,FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule,MatSelectModule, MatDatepickerModule,MatFormField ],
  
  templateUrl: './loan-edit.component.html',
  styleUrl: './loan-edit.component.scss',
  providers: [
              {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
              {provide: DateAdapter, useClass:MomentDateAdapter, deps: [MAT_DATE_LOCALE]}
  ]
  
})

export class LoanEditComponent implements OnInit {

  loan: Loan;
  clients: Client[] =[];
  games: Game[] = [];

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService,
    private clientService: ClientService,
    private gameService: GameService,
    public dialog : MatDialog,
    
) {}

  ngOnInit(): void {

    this.loan = this.data.loan ? Object.assign({}, this.data.loan) : new Loan();
    
        this.clientService.getClients().subscribe((clients) => {
            this.clients = clients;
  
            if (this.loan.client != null) {
                const clientFilter: Client[] = clients.filter(
                    (client) => client.id == this.data.loan.client.id
                );
                if (clientFilter != null) {
                    this.loan.client = clientFilter[0];
                }
            }
        });
  
        this.gameService.getAllGames().subscribe((games) => {
            this.games = games;
  
            if (this.loan.game != null) {
                const gameFilter: Game[] = games.filter(
                    (game) => game.id == this.data.game.id
                );
                if (gameFilter != null) {
                    this.loan.game = gameFilter[0];
                }
            }
        });
    }
    

onSave() {
  const date1 = new Date(this.loan.date1);
  const date2 = new Date(this.loan.date2);
  const diffDays = Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));

   if (date2 <= date1) {
     this.dialog.open(DialogConfirmationComponent, {
        data: { tittle:'Error', description:'La fecha de finalización debe ser posterior a la fecha de inicio.',
          confirm: false
        }
      });   
     return;
     }      
  if (diffDays > 14) {
     this.dialog.open(DialogConfirmationComponent, {
        data: { tittle:'Error', description:'La diferencia entre las fechas no puede ser mayor a 14 días.',
          confirm: false
        }
      });
  return;
  }
      
  this.loanService.saveLoan(this.loan).subscribe({
  next: () => {
    this.dialog.open(DialogConfirmationComponent, {
      data: { title: '', description: 'El préstamo se ha guardado correctamente.', confirm: false }
      });
      this.dialogRef.close();    
  },
  error: (error) => {
      console.error('Error al guardar el préstamo:', error);
      this.dialog.open(DialogConfirmationComponent, {
        data: { tittle:'Error', description:'Hubo un error al guardar el préstamo. Por favor, inténtalo de nuevo.',
          confirm: false }
      });
      
  }
  });
}    

onClose() {
  this.dialogRef.close();
  }
    

  

}
