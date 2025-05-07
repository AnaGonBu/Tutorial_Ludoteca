import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { Client } from '../model/Client';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-client-edit',
  imports: [MatFormField,MatError,MatLabel,FormsModule,MatButtonModule,MatInput,MatLabel],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent implements OnInit {

  client: Client;


  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {client : Client},
    private clientService: ClientService,
    public dialog: MatDialog, 
) {}

ngOnInit(): void {
    this.client = this.data.client ? Object.assign({},this.data.client) : new Client();
}

onSave() {
    this.clientService.saveClient(this.client).subscribe({
      next: () => {
        this.dialog.open(DialogConfirmationComponent, {
          data: { title: '', description: 'El cliente se ha guardado correctamente.', confirm: false }
        });
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error al guardar el cliente:', error);
        let errorMessage = 'Hubo un error al guardar el cliente. Por favor, inténtalo de nuevo.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.dialog.open(DialogConfirmationComponent, {
          data: { title: 'Error', description: errorMessage, confirm: false }
        });
      }
    });
  }
  

onClose() {
    this.dialogRef.close();
}

}
