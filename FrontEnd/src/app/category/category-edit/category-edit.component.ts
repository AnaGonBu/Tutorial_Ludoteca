import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../model/Category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-edit',
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatInputModule, MatButtonModule,],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent implements OnInit {

  category: Category;

  constructor(
    public dialogRef: MatDialogRef<CategoryEditComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: {category : Category},
) {}

ngOnInit(): void {
  this.category = this.data.category ? Object.assign({}, this.data.category) : new Category();
}


onClose() {
this.dialogRef.close();
}

onSave() {

this.categoryService.saveCategory(this.category).subscribe(() =>{
  this.dialogRef.close();
});
}


}
