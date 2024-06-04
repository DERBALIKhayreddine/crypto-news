import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, NgApexchartsModule } from 'ng-apexcharts';
import { AppUserService } from '../../service/app-user.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-user-chart',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule],
  templateUrl: './user-chart.component.html',
  styleUrl: './user-chart.component.scss'
})
export class UserChartComponent implements OnInit {
  chartData: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
  };

  constructor(private userService: AppUserService) {
    this.chartData = {
      series: [],
      chart: {
        type: 'pie',
      },
      labels: []
    };
  }

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.getAllAppUsers(token);
    }
  }

  getAllAppUsers(token: string) {
    this.userService.getAllAppUsers(token).subscribe(
      (response: any) => {
        const activeUsers = response.filter((user: any) => user.status === 'true').length;
        const inactiveUsers = response.filter((user: any) => user.status === 'false').length;
        this.chartData.series = [activeUsers, inactiveUsers];
        this.chartData.labels = ['Active Users', 'Inactive Users'];
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
