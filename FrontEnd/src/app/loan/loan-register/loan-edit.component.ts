import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Loan } from '../model/loan';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoanService } from '../loan.service';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { Client } from '../../client/model/Client';
import { Game } from '../../game/model/Game';
import { CLIENT_DATA } from '../../client/model/mock-clients';
import { GAME_DATA } from '../../game/model/mock-games';

@Component({
  selector: 'app-loan-edit',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatSelectModule],
  templateUrl: './loan-edit.component.html',
  styleUrl: './loan-edit.component.scss'
})
export class LoanEditComponent implements OnInit {

  loan: Loan;

  // clientNames: string[] = []
  // gameTitles: string[] = []
  
  


  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService
) {}

  ngOnInit(): void {
    // this.loan = new Loan()
    this.loan = this.data.loan ? Object.assign({}, this.data.loan) : new Loan();
    // this.clientNames=this.loanService.getClients()
    // this.gameTitles=this.loanService.getGames()
  }

  onSave() {
    this.loanService.saveLoan(this.loan).subscribe(()=>{
      this.dialogRef.close();
    });
    }
    onClose() {
      this.dialogRef.close();
    }

}
