import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  ApiResponseCategory,
  Category,
  CategoryService,
} from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, debounceTime, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Category>([]);
  searchTerm: Subject<string> = new Subject<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getCategories();
    this.subscrtiptionSearch();
  }

  getCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe((response: ApiResponseCategory) => {
        this.processCategoryResponse(response);
      });
  }

  processCategoryResponse(response: ApiResponseCategory): void {
    if (response.metadata[0].code === '200') {
      let listCategories = response.categoriaResponse.categorias;

      this.dataSource.data = listCategories;
    }
  }

  newCategorie(): void {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result === 1) {
        this.snackBar.open('Categoria Creada!', 'Exito', {
          duration: 2000,
        });
        this.getCategories();
      } else if (result === 2) {
        this.snackBar.open('Error al guardar la categoria!', 'Error', {
          duration: 2000,
        });
      }
    });
  }

  edit(element: Category): void {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      data: element,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.snackBar.open('Categoria Actualizada!', 'Exito', {
          duration: 2000,
        });
        this.getCategories();
      } else if (result === 2) {
        this.snackBar.open('Error al actualizar la categoria!', 'Error', {
          duration: 2000,
        });
      }
    });
  }

  delete(element: Category): void {
    const { id } = element;
    this.categoryService.deleteCategorie(id ?? 0).subscribe({
      next: () => {
        this.snackBar.open('Categoria Eliminada!', 'Exito', {
          duration: 2000,
        });
        this.getCategories();
      },
      error: () => {
        this.snackBar.open('Error al eliminar la categoria!', 'Error', {
          duration: 2000,
        });
      },
    });
  }

  search(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.searchTerm.next(value);
  }

  subscrtiptionSearch(): void {
    this.searchTerm
      .pipe(
        debounceTime(500),
        switchMap((term: string) => {
          if (term.length === 0) {
            return this.categoryService.getCategories();
          } else {
            return this.categoryService.getCategoyById(term).pipe(
              catchError(() => {
                this.snackBar.open('Categoria no encontrada!', 'Error', {
                  duration: 2000,
                });
                return of();
              })
            );
          }
        })
      )
      .subscribe((response: any) => {
        this.processCategoryResponse(response);
      });
  }
}
