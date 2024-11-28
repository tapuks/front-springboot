import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { NewCategoryComponent } from './components/new-category/new-category.component';

@NgModule({
  declarations: [CategoryComponent, NewCategoryComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
})
export class CategoryModule {}
