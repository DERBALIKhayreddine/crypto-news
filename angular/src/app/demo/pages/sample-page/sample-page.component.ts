// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-sample-page',
  standalone: true,
  imports: [SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export default class SamplePageComponent implements OnInit {
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
