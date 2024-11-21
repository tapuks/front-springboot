import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Category,
  CategoryService,
} from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent implements OnInit {
  name = '';
  description = '';
  id!: number;

  readonly dialogRef = inject(MatDialogRef<NewCategoryComponent>);
  readonly data = inject<Category>(MAT_DIALOG_DATA);
  private readonly categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.id = this.data?.id ?? 0;
    this.name = this.data?.name ?? '';
    this.description = this.data?.description ?? '';
  }

  saveCategory(): void {
    if (this.data?.id) {
      this.updateCategory();
      return;
    }
    this.postCategorie({ name: this.name, description: this.description });
  }

  notSave(): void {
    this.dialogRef.close(3);
  }

  postCategorie(body: Category): void {
    this.categoryService.postCategorie(body).subscribe({
      next: () => {
        this.dialogRef.close(1);
      },
      error: () => {
        this.dialogRef.close(2);
      },
    });
  }

  updateCategory(): void {
    this.categoryService
      .putCategorie(this.id, {
        name: this.name,
        description: this.description,
      })
      .subscribe({
        next: () => {
          this.dialogRef.close(1);
        },
        error: () => {
          this.dialogRef.close(2);
        },
      });
  }
}
