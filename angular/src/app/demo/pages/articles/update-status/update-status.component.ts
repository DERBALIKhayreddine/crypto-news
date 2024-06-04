import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-update-status',
  standalone: true,
  imports: [  CommonModule,
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
  templateUrl: './update-status.component.html',
  styleUrl: './update-status.component.scss'
})
export class UpdateStatusComponent implements OnInit {
  selectedStatus: string;

  statusOptions = [
    { value: 'draft', viewValue: 'Draft' },
    { value: 'published', viewValue: 'Published' },
    { value: 'archived', viewValue: 'Archived' },
    { value: 'complete', viewValue: 'Complete' }
  ];

  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<UpdateStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudService: CrudService
  ) {
    // Initialize selectedStatus with the status value passed from the parent component
    this.selectedStatus = data.result;
  }

  ngOnInit(): void {
    // No need to call updateStatus() here
  }

  updateStatus(): void {
    if (this.selectedStatus) {
      console.log("Before close - selectedStatus:", this.selectedStatus);
      this.dialogRef.close(this.selectedStatus);
    } else {
      this.toastr.info('Please select a status!', 'Error');
    }
  }

}
