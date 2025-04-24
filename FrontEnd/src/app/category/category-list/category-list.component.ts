import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category } from '../model/Category';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryService } from '../category.service';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    MatFormFieldModule, 
    MatInputModule,
    
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(private categoryService: CategoryService,
              public dialog: MatDialog,
              private snackBar:MatSnackBar) {}

  createCategory() {    
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });    
  } 

  editCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: { category }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  deleteCategory(category: Category) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
        data: {
            title: `¿Desea eliminar ${category.name}?`,
            description: "Atención si borra la categoría se perderán sus datos.<br> ¿Desea eliminarla?"
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.categoryService.deleteCategory(category.id).subscribe({
                next: (response) => {
                    this.ngOnInit();
                    this.snackBar.open('Categoría eliminada correctamente', 'Cerrar', { duration: 3000 });
                },
                error: (error) => {
                    console.error('Error al eliminar la categoría:', error);
                    let errorMessage = 'Error al eliminar la categoría.';

                    if (error.error && typeof error.error === 'string') {
                        errorMessage = error.error; // El mensaje está directamente aquí
                    } else if (error.message) {
                        errorMessage = error.message;
                    }

                    this.dialog.open(DialogConfirmationComponent, {
                        data: {
                            title: 'Error',
                            description: errorMessage
                        }
                    });
                }
            });
        }
    });
}


  // deleteCategory(category: Category) { 
  //   const dialogRef = this.dialog.open(DialogConfirmationComponent, { 
  //     data: { title: `¿Desea eliminar ${category.name}?`, 
  //     description: "Atención si borra la categoría se perderán sus datos.<br> ¿Desea eliminarla?" }
  //    });
  //     dialogRef.afterClosed().subscribe(result => { if (result) 
  //       { this.categoryService.deleteCategory(category.id).subscribe({ next: (response) => {
  //         this.ngOnInit(); 
  //         this.snackBar.open('Categoría eliminada correctamente', 'Cerrar', { duration: 3000, 
  //         }); 
  //       }, error: (error) => {
  //         console.error('Error al eliminar la categoría:', error);
  //         let errorMessage = 'Error al eliminar la categoría.';
      
  //         if (error.error) {
  //             errorMessage = error.error; // El mensaje está directamente aquí
  //         } else if (error.message) {
  //             errorMessage = error.message;
  //         }
      
  //         alert(errorMessage);
  //     }
  //           }); 
  //         } 
  //       }); 
  //     } 
  
  // deleteCategory(category: Category) {    
  //   const dialogRef = this.dialog.open(DialogConfirmationComponent, {
  //     data: { title: `¿Desea eliminar ${category.name}?`,
  //             description: "Atención si borra la categoría se perderán sus datos.<br> ¿Desea eliminarla?" }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.categoryService.deleteCategory(category.id).subscribe(result => {
  //         this.ngOnInit();
  //       }); 
  //     }
  //   });
  // } 

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.dataSource.data = categories;
    });
  }
}