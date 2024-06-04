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
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-edit-category-dialog',
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
  templateUrl: './edit-category-dialog.component.html',
  styleUrl: './edit-category-dialog.component.scss'
})
export class EditCategoryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, name: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onEdit(): void {
    this.dialogRef.close(this.data);
  }
}
