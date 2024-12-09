import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ApiResponseCategory,
  Category,
  CategoryService,
} from '../../shared/services/category.service';
import { map, Observable } from 'rxjs';
import {
  Product,
  ProductBody,
  ProductService,
} from '../../shared/services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface ProductForm {
  name: FormControl<string | null>;
  price: FormControl<number | null>;
  cantidad: FormControl<number | null>;
  categoria: FormControl<number | null>;
  photo: FormControl<File | null>;
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  formProduct!: FormGroup<ProductForm>;
  categories$!: Observable<Category[]>;
  selectedFile!: any;
  nameImg = '';

  private readonly categoriesService = inject(CategoryService);
  private readonly productService = inject(ProductService);
  readonly dialogRef = inject(MatDialogRef<NewProductComponent>);
  readonly data = inject<Product>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.createForm();
    this.loadCategories();
    if (this.data) {
      this.setData();
    }
  }

  createForm(): void {
    this.formProduct = new FormGroup<ProductForm>({
      name: new FormControl<string>('', Validators.required),
      price: new FormControl<number | null>(null, Validators.required),
      cantidad: new FormControl<number>(1, Validators.required),
      categoria: new FormControl<number | null>(null, Validators.required),
      photo: new FormControl<File | null>(null, Validators.required),
    });
  }

  setData(): void {
    this.formProduct.patchValue({
      name: this.data.name,
      price: this.data.price,
      cantidad: this.data.cantidad,
      categoria: this.data.categoria.id,
      // photo: this.data.photo,
    });
  }

  loadCategories(): void {
    this.categories$ = this.categoriesService
      .getCategories()
      .pipe(
        map(
          (response: ApiResponseCategory) =>
            response.categoriaResponse.categorias
        )
      );
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.formProduct.patchValue({ photo: file });
    }
  }

  notSave(): void {
    this.dialogRef.close(0);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.nameImg = this.selectedFile.name;
      this.formProduct.patchValue({ photo: this.selectedFile });
    }
  }

  //arreglar la llamada que no funcionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

  save(): void {
    const formValue = this.formProduct.value;
    const product = {
      name: formValue.name ?? '',
      price: formValue.price ?? 0,
      cantidad: formValue.cantidad ?? 0,
      photo: this.selectedFile ?? null,
      categoryId: formValue.categoria ?? 0,
    };

    const uploadData = new FormData();
    uploadData.append('name', product.name);
    uploadData.append('price', product.price.toString());
    uploadData.append('cantidad', product.cantidad.toString());
    uploadData.append('photo', product.photo, product.photo.name);
    uploadData.append('categoryId', product.categoryId.toString());

    if (this.data) {
      this.productService
        .putProduct(this.data.id as number, uploadData as any)
        .subscribe({
          next: () => {
            this.dialogRef.close(1);
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
    } else {
      this.productService.postProduct(uploadData as any).subscribe({
        next: () => {
          this.dialogRef.close(1);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
    }
  }
}
