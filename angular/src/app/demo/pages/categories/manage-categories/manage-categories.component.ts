import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/demo/service/crud.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';

@Component({
  selector: 'app-manage-categories',
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
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.scss'
})
export class ManageCategoriesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'edit'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private crud: CrudService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loadTableData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadTableData() {
    this.crud.getAllCategories().subscribe(
      (res: any) => {
        this.dataSource.data = res;
      },
      (err: any) => {
        console.error('Error fetching categories:', err);
        if (err.status === 401) {
          this.toastr.error('Unauthorized access. Please log in.');
          this.route.navigate(['/login']);
        } else {
          this.toastr.error('Failed to load categories. Please try again later.');
        }
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '250px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crud.addNewCategory(result).subscribe(
          () => {
            this.toastr.success('Category added successfully');
            this.loadTableData();
          },
          (error) => {
            console.error('Error adding category:', error);
            if (error.status === 404) {
              this.toastr.error('API endpoint not found.');
            } else {
              this.toastr.error('Failed to add category');
            }
          }
        );
      }
    });
  }


  openEditDialog(category: any) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '250px',
      data: { id: category.id, name: category.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crud.updateCategory(result).subscribe(
          () => {
            this.toastr.success('Category updated successfully');
            this.loadTableData();
          },
          (error) => {
            console.error('Error updating category:', error);
            this.toastr.error('Failed to update category');
          }
        );
      }
    });
  }

  openDeleteDialog(category: any) {
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {
      width: '250px',
      data: { id: category.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crud.deleteCategory(result).subscribe(
          () => {
            this.toastr.success('Category deleted successfully');
            this.loadTableData();
          },
          (error) => {
            console.error('Error deleting category:', error);
            this.toastr.error('Failed to delete category');
          }
        );
      }
    });
  }
}
