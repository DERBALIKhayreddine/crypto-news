import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/demo/service/crud.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-add-articles',
  standalone: true,
  imports:[
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SharedModule,MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './add-articles.component.html',
  styleUrl: './add-articles.component.scss'
})
export class AddArticlesComponent {
  articleForm: FormGroup;
  categories: any[] = [];
  isAdmin: boolean = false; // Variable to check if the user is admin

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddArticlesComponent>,
    private toast: ToastrService,
    private crudService: CrudService
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category_id: [null, Validators.required],
      publication_date: [new Date().toISOString().slice(0, 10)],
      status: ['draft']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    const userEmail = localStorage.getItem('email');
    this.isAdmin = userEmail === 'admin@gmail.com';
    const token = localStorage.getItem('accessToken');

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

  addArticle(): void {
    if (this.articleForm.valid) {
      this.crudService.addNewArticle(this.articleForm.value)
        .subscribe((response) => {
          console.log('Article added successfully:', response);
          this.toast.success("Article added successfully");
          this.dialogRef.close(true); // Close the dialog with success flag
        }, (error) => {
          console.error('Error adding article:', error);
          this.dialogRef.close(false); // Close the dialog with failure flag
        });
    }
  }

  cancel(): void {
    this.dialogRef.close(); // Close the dialog without adding article
  }
}
