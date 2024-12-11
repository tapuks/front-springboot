import { Component, inject, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {
  ApiResponseProduct,
  ProductService,
} from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  chartBar: any;
  doughnutChart: any;
  private readonly productService = inject(ProductService);
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
      const namesProduct: string[] = [];
      const cantidadProduct: number[] = [];
      let listProducts = response.productResponse.products;
      listProducts.forEach((product) => {
        namesProduct.push(product.name);
        cantidadProduct.push(product.cantidad);
      });
      this.chartBar = new Chart('canvas-bar', {
        type: 'bar',
        data: {
          labels: namesProduct,
          datasets: [{ label: 'Cantidad', data: cantidadProduct }],
        },
      });

      this.doughnutChart = new Chart('canvas-doughnut', {
        type: 'doughnut',
        data: {
          labels: namesProduct,
          datasets: [{ label: 'Cantidad', data: cantidadProduct }],
        },
      });
    }
  }
}
