import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Client } from '../model/Client';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
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
      deleteClient(client: Client) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
          data: { title: `¿Desea eliminar a ${client.name}?`, description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?" }
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.clientService.deleteClient(client.id).subscribe({
              next: () => {
                this.dialog.open(DialogConfirmationComponent, {
                  data: { title: '', description: 'El cliente se ha eliminado correctamente.', confirm: false }
                });
                this.ngOnInit();
              },
              error: (error) => {
                console.error('Error al eliminar el cliente:', error);
                let errorMessage = 'Hubo un error al eliminar el cliente. Por favor, inténtalo de nuevo.';
                if (error.error && error.error.message) {
                  errorMessage = error.error.message;
                }
                this.dialog.open(DialogConfirmationComponent, {
                  data: { title: 'Error', description: errorMessage, confirm: false }
                });
              }
            });
          }
        });
      }
      
}
