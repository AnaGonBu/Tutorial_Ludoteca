import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {  MatError, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Loan } from '../model/loan';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoanService } from '../loan.service';
import { MatSelectModule } from '@angular/material/select';
import { Client } from '../../client/model/Client';
import { Game } from '../../game/model/Game';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ClientService } from '../../client/client.service';
import { GameService } from '../../game/game.service';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-loan-edit',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatSelectModule, MatDatepickerModule, MatNativeDateModule  ,MatError,MatLabel],
  
  templateUrl: './loan-edit.component.html',
  styleUrl: './loan-edit.component.scss'
})
export class LoanEditComponent implements OnInit 
{

  loan: Loan;
  clients: Client[] =[];
  games: Game[] = [];
  


  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService,
    private clientService: ClientService,
    private gameService: GameService,



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
      
  if (diffDays > 14) {
  alert('La diferencia entre las fechas no puede ser mayor a 14 días.');
  return;
  }
      
  this.loanService.saveLoan(this.loan).subscribe({
  next: () => {
      this.dialogRef.close();
  },
  error: (error) => {
      console.error('Error al guardar el préstamo:', error);
      alert('Hubo un error al guardar el préstamo. Por favor, inténtalo de nuevo.');
  }});
}
      
      

    onClose() {
      this.dialogRef.close();
    }
    

  

}
