import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-allcoins',
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
    SharedModule
  ],
  templateUrl: './allcoins.component.html',
  styleUrls: ['./allcoins.component.scss']
})
export default class AllcoinsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['image', 'current_price', 'priceChange', 'updated_date', 'high_24h', 'low_24h', 'view_details'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllData() {
    this.api.getCurrency('USD').subscribe(res => {
      this.dataSource.data = res; // Assuming res is an array of data
      console.log(res);
    });
  }

  gotoDetails(row: any) {
    this.router.navigate(['/crypto/coin-detail', row.id]);
  }
}
