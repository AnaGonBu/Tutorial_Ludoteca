import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Client } from '../model/Client';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClientService } from '../client.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-client-list',
  standalone:true,
  imports: [CommonModule, 
            MatTableModule, 
            MatButtonModule,
            MatIconModule,],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit{



    dataSource = new MatTableDataSource<Client>();
    displayedColumns: string[] = ['id', 'name', 'action'];

    constructor(
      private clientService: ClientService,
      public dialog : MatDialog,
    ) { }

    ngOnInit(): void {
      this.clientService.getClients().subscribe(clients => this.dataSource.data = clients)
    }

    createClient() {
      const dialogRef = this.dialog.open(ClientEditComponent,{ data : {}
    });

      dialogRef.afterClosed().subscribe(result => this.ngOnInit())
      }

    editClient(client: Client) {
        const dialogRef = this.dialog.open(ClientEditComponent, {
          data: { client }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
        });
      }

      deleteClient(category: Client) {    
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
          data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?" }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.clientService.deleteClient(category.id).subscribe(result => {
              this.ngOnInit();
            }); 
          }
        });
      } 
}
