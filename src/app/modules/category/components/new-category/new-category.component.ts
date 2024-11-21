import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ApiResponse,
  Category,
  CategoryService,
} from 'src/app/modules/shared/services/category.service';
import { DialogData } from '../category/category.component';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent {
  name = '';
  description = '';

  readonly dialogRef = inject(MatDialogRef<NewCategoryComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  private readonly categoryService = inject(CategoryService);

  saveCategory(): void {
    this.postCategorie({ name: this.name, description: this.description });
  }

  notSave(): void {
    this.dialogRef.close(3);
  }

  postCategorie(body: Category): void {
    this.categoryService
      .postCategorie(body)
      .subscribe((response: ApiResponse) => {
        if (response.metadata[0].code === '200') {
          this.dialogRef.close(1);
        } else {
          this.dialogRef.close(2);
        }
      });
  }
}
