import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-confirmation',
  imports: [MatButton,],
  templateUrl: './dialog-confirmation.component.html',
  styleUrl: './dialog-confirmation.component.scss'
})
export class DialogConfirmationComponent {

  title: string;
  description: string;
  GAME_DATA: string;
  confirm: boolean = true;

  constructor(
    public dialogRef :MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void{

    this.title = this.data.title
    this.description =this.data.description
    this.confirm = this.data.confirm !== false;
  }

  onClose (value = false) {
    this.dialogRef.close(value)
  }

}
