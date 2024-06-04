import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AppUser } from 'src/app/demo/models/appuser';
import { AppUserService } from 'src/app/demo/service/app-user.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { StatusDialogComponent } from '../status-dialog/status-dialog.component';

@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [
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
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.scss'
})
export class UserslistComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'status', 'actions'];
  dataSource: MatTableDataSource<AppUser> = new MatTableDataSource<AppUser>();
  users: AppUser[] = []; // Corrected type declaration
  token: string | null = null; // Initialize token as null or undefined


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: AppUserService, private dialog:MatDialog ) { }

  ngAfterViewInit() {
    this.token = localStorage.getItem('accessToken');
    if (!this.token) {
      console.error('Access token not found.');
      return;
    }

    this.userService.getAllAppUsers(this.token).subscribe(
      (data: Object) => {
        this.users = data as AppUser[];
        this.dataSource.data = this.users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
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

  openStatusDialog(user: AppUser): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '250px',
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe((updatedStatus: string) => {
      if (updatedStatus) {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index].status = updatedStatus;
          this.dataSource.data = this.users;

          // Use the token class property here
          if (this.token) {
            this.userService.updateUserStatus(this.token, this.users[index]).subscribe(
              (response: any) => {
                console.log('User status updated successfully:', response);
              },
              (error: any) => {
                console.error('Error updating user status:', error);
              }
            );
          } else {
            console.error('Access token not found.');
          }
        }
      }
    });
  }



}
