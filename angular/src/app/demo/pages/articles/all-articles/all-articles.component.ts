import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/demo/service/crud.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AddArticlesComponent } from '../add-articles/add-articles.component';
import { DeleteArticlesComponent } from '../delete-articles/delete-articles.component';
import { UpdateStatusComponent } from '../update-status/update-status.component';
import { ViewArticleComponent } from '../view-article/view-article.component';

@Component({
  selector: 'app-all-articles',
  standalone: true,
  imports: [
    SharedModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule

  ],
  templateUrl: './all-articles.component.html',
  styleUrl: './all-articles.component.scss'
})
export class AllArticlesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'category_id', 'publication_date', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>();
  isAdmin: boolean = false; // Variable to check if the user is admin

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private crudService: CrudService, private dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getAllArticles();
    const userEmail = localStorage.getItem('email');
    this.isAdmin = userEmail === 'admin@gmail.com';
    const token = localStorage.getItem('accessToken');
  }

  getAllArticles(): void {
    this.crudService.getAllArticles().subscribe((data: any[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log( "all articles list ",this.dataSource.data);

    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewArticleById(id: number): void {
    const article = this.dataSource.data.find((item: any) => item.id === id);
    if (article) {
      this.dialog.open(ViewArticleComponent, {
        width: '600px',
        height: '600px',
        data: { article }
      });
    }
  }

// Article List Component
updateArticleStatus(id: number, result: any): void {
  console.log('Before update - result:', result);
  this.dialog.open(UpdateStatusComponent, {
    width: '400px',
    data: { id, result }
  }).afterClosed().subscribe(newStatus => {
    console.log('After update - newStatus:', newStatus);
    if (newStatus) {
      this.crudService.updateArticleStatus(id, newStatus).subscribe(response => {
        this.toastr.success('Article status updated successfully!', 'Success');
        const articleIndex = this.dataSource.data.findIndex(article => article.id === id);
        if (articleIndex !== -1) {
          this.dataSource.data[articleIndex].status = newStatus;
          this.dataSource._updateChangeSubscription();
        }
      }, error => {
        this.toastr.error('Failed to update article status!', 'Error');
      });
    }
  });
}


  deleteArticle(id: number): void {
    this.dialog.open(DeleteArticlesComponent, {
      width: '400px',
      data: { id }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getAllArticles(); // Refresh data if operation was successful
      }
    });
  }

  openAddArticleDialog(): void {
    this.dialog.open(AddArticlesComponent, {
      width: '600px' // Adjust width as needed
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getAllArticles(); // Refresh data if operation was successful
      }
    });
  }
}
