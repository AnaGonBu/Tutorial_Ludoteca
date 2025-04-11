import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoanService } from '../loan.service';
import { Loan } from '../model/loan';

@Component({
  selector: 'app-loan-edit',
  imports: [FormsModule,
            CommonModule, 
            ReactiveFormsModule, 
            MatFormFieldModule, 
            MatInputModule, 
            MatButtonModule,
            MatSelectModule, 
            MatDatepickerModule,
            MatNativeDateModule],
  templateUrl: './loan-edit.component.html',
  styleUrl: './loan-edit.component.scss'
})
export class LoanEditComponent implements OnInit {

  loan: Loan;
  maxDate: Date;
  clientNames: string[] = [];
  gameNames: string[] = [];


  
  


  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService
) {
  this.loan = new Loan();
  this.maxDate = new Date();
}

  ngOnInit(): void {
    // this.loan = new Loan()
    this.loan = this.data.loan ? Object.assign({}, this.data.loan) : new Loan();
    this.loanService.getClients().subscribe(clients => {
      this.clientNames = clients;
    });

    this.loanService.getGames().subscribe(games => {
      this.gameNames = games;
    });
  }

  onDateChange(): void {
    if (this.loan.date1 && this.loan.date2) {
      const diffTime = Math.abs(this.loan.date2.getTime() - this.loan.date1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 14) {
        alert('La diferencia entre las fechas no puede ser mayor a 14 días');
        this.loan.date2 = new Date(this.loan.date1);
        this.loan.date2.setDate(this.loan.date2.getDate() + 14);
      }
    }
    
    if (this.loan.date1) {
      this.maxDate = new Date(this.loan.date1);
      this.maxDate.setDate(this.maxDate.getDate() + 14);
    }
  }

  onSave() {
    if (this.validateDates()) {
      this.loanService.saveLoan(this.loan).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  validateDates(): boolean {
    if (!this.loan.date1 || !this.loan.date2) {
      alert('Ambas fechas son requeridas');
      return false;
    }

    if (this.loan.date2 < this.loan.date1) {
      alert('La fecha de fin no puede ser anterior a la fecha de inicio');
      return false;
    }

    const diffTime = Math.abs(this.loan.date2.getTime() - this.loan.date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 14) {
      alert('La diferencia entre las fechas no puede ser mayor a 14 días');
      return false;
    }

    return true;
  }

  onClose() {
    this.dialogRef.close();
  }   

  

}
