import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../model/Category';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../category.service';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-category-edit',
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatInputModule, MatButtonModule,],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent implements OnInit {

  category: Category;
  nameError: string;
  categoryForm: any;

  constructor(
    public dialogRef: MatDialogRef<CategoryEditComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: {category : Category},
    public dialog: MatDialog,
) {}

ngOnInit(): void {
  this.category = this.data.category ? Object.assign({}, this.data.category) : new Category();
  this.categoryForm = new FormGroup({
    id: new FormControl({ value: this.data.category?.id || '', disabled: true }),
    name: new FormControl('', Validators.required)
  });
}


onClose() {
this.dialogRef.close();
}

onSave() {  
this.category.name = this.toCamelCase(this.category.name);
  if (this.validateName(this.category.name)){
    this.categoryService.saveCategory(this.category).subscribe({
      next: () => {
        this.dialog.open(DialogConfirmationComponent, {
          data: { title: '', description: 'El autor se ha guardado correctamente.', confirm: false }
        });
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error al guardar el autor:', error);
        let errorMessage = 'Hubo un error al guardar el autor. Por favor, inténtalo de nuevo.';
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


}
