import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/demo/service/crud.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-delete-articles',
  standalone: true,
  imports: [
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
    SharedModule,MatDialogModule
  ],
  templateUrl: './delete-articles.component.html',
  styleUrl: './delete-articles.component.scss'
})
export class DeleteArticlesComponent {
  constructor(
    private toastr:ToastrService,
    public dialogRef: MatDialogRef<DeleteArticlesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudService: CrudService // Inject the CrudService
  ) { }

  confirmDelete(): void {
    this.crudService.deleteArticle(this.data.id)
      .subscribe((response) => {
        console.log(response); // Log the response
        this.toastr.success('Article deleted successfully');
        this.dialogRef.close(true);
      }, (error) => {
        console.error('Error deleting article:', error);
        this.toastr.error("Error deleting article")
        this.dialogRef.close(false);
      });
  }

  cancel(): void {
    this.dialogRef.close(false); // Close dialog without confirmation
  }
}
