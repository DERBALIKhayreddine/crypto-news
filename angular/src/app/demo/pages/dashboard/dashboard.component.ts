// angular import
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

// third party
import {
  NgApexchartsModule
} from 'ng-apexcharts';
import { UserChartComponent } from "../../charts/user-chart/user-chart.component";
import { ApiService } from '../../service/api.service';
import { AppUserService } from '../../service/app-user.service';
import { CrudService } from '../../service/crud.service';
import { ManageCategoriesComponent } from '../categories/manage-categories/manage-categories.component';
import { UserslistComponent } from "../users/userslist/userslist.component";

  @Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [CommonModule, SharedModule, NgApexchartsModule, UserslistComponent, UserChartComponent, NgApexchartsModule,ManageCategoriesComponent]
  })
  export default class DashboardComponent implements OnInit {
    bannerData: any[] = [];
  articles: any[] = [];
  categories: any[] = [];
  isAdmin: boolean = false;
  chartData: {
    series: number[];
    chart: any;
    labels: string[];
  } = { series: [], chart: { type: 'pie' }, labels: [] };
  articleCount: number = 0;
  categoryCount: number = 0;

  chartOptions: any = {
    series: [{
      data: []
    }],
    chart: {
      type: 'bar',
      height: 350,
      id: 'mainChart'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Articles', 'Categories']
    },
    yaxis: {
      title: {
        text: 'Count'
      }
    },
    fill: {
      opacity: 1
    },
  };

  brushChartOptions: any = {
    series: [{
      data: []
    }],
    chart: {
      id: 'brushChart',
      type: 'line',
      height: 150,
      brush: {
        target: 'mainChart',
        enabled: true
      },
      selection: {
        enabled: true
      }
    },
    xaxis: {
      categories: ['Articles', 'Categories']
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    dataLabels: {
      enabled: false
    },
  };

  constructor(private api: ApiService, private userService: AppUserService, private crudService: CrudService) { }

  ngOnInit(): void {
    this.getBannerData();
    const userEmail = localStorage.getItem('email');
    this.isAdmin = userEmail === 'admin@gmail.com';
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.getAllAppUsers(token);
    }
    this.getAllPublished();
    this.loadCategories();
  }

  articlesFetched: boolean = false;
  categoriesFetched: boolean = false;

  getBannerData() {
    this.api.getTrendingCurrency('USD').subscribe(
      (res: any) => {
        this.bannerData = res;
      },
      (error) => {
        console.error('Error fetching banner data', error);
      }
    );
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

  getAllPublished() {
    this.crudService.getAllPublishedArticles().subscribe(
      (res: any[]) => {
        this.articles = res;
        this.articlesFetched = true;
        this.checkDataFetchStatus();
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }

  loadCategories(): void {
    this.crudService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
        this.categoriesFetched = true;
        this.checkDataFetchStatus();
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  checkDataFetchStatus() {
    if (this.articlesFetched && this.categoriesFetched) {
      this.articleCount = this.articles.length;
      this.categoryCount = this.categories.length;
      this.chartOptions.series[0].data = [this.articleCount, this.categoryCount];
      this.brushChartOptions.series[0].data = [this.articleCount, this.categoryCount];
    }
  }
}
