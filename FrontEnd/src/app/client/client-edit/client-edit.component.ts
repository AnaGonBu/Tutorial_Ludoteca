import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { Client } from '../model/Client';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-client-edit',
  imports: [MatFormField,MatError,MatLabel,FormsModule,MatButtonModule,MatInput,MatLabel, ReactiveFormsModule],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent implements OnInit {

  client: Client;
  nameError: string;
  clientForm: any;


  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {client : Client},
    private clientService: ClientService,
    public dialog: MatDialog, 
) {}

ngOnInit(): void {
    this.client = this.data.client ? Object.assign({},this.data.client) : new Client();
    this.clientForm = new FormGroup({
          id: new FormControl({ value: this.data.client?.id || '', disabled: true }),
          name: new FormControl('', Validators.required),
    });
  }

onSave() {  
this.client.name = this.toCamelCase(this.client.name);
  if (this.validateName(this.client.name)){
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
  } else {
    this.dialog.open(DialogConfirmationComponent, {
      data: { title: 'Error', description: this.nameError, confirm: false }
    });
  }
}

 toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase())
    .replace(/\s+/g, ' ')
    .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase())
    .replace(/\s+/g, ' ');
}

validateName(name: string): boolean {
  const namePattern = /^[A-Z][a-zA-Z]*(?:\s[A-Z]\.)?(?:\s[A-Z][a-zA-Z]*)*(?:-[A-Z][a-zA-Z]*)*$/;
  if (!namePattern.test(name)) {
    this.nameError = 'El nombre debe tener al menos 3 caracteres y no contener caracteres especiales.';
    return false;
  }
  this.nameError = '';
  return true;
}

  

onClose() {
    this.dialogRef.close();
}

}
