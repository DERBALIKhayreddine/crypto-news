import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudService } from '../../service/crud.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:
  [
    SharedModule,RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private crudService: CrudService) {}

  articles: any[] = [];
  categories: any[] = [];

  ngOnInit(): void {
    this.getAllPublished();
    this.loadCategories();
  }

  getAllPublished() {
    this.crudService.getAllPublishedArticles().subscribe((res: any[]) => {
      this.articles = res;
    });
  }

  loadCategories(): void {
    this.crudService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        // Handle error if necessary
      }
    );
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }
}
