import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { Client } from '../model/Client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

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
    private clientService: ClientService
) {}

ngOnInit(): void {
    this.client = this.data.client ? Object.assign({},this.data.client) : new Client();
}

onSave() {
    this.clientService.saveClient(this.client).subscribe(() => {
        this.dialogRef.close();
    });
}

onClose() {
    this.dialogRef.close();
}

}
