import { Component, inject, ViewChild } from '@angular/core';
import {
  ApiResponseProduct,
  Product,
  ProductService,
} from '../../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  private readonly productService = inject(ProductService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'cantidad',
    'category',
    'photo',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response: ApiResponseProduct) => {
        this.processProductResponse(response);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  processProductResponse(response: ApiResponseProduct): void {
    if (response.metadata[0].code === '200') {
      let listProducts = response.productResponse.products;
      listProducts.forEach((product) => {
        product.photo = 'data:image/jpeg;base64,' + product.photo;
      });

      this.dataSource.data = listProducts;
      console.log('datasourceeeeeeeeeeeeee', this.dataSource);
    }
  }
}
