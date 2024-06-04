import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule
} from 'ng-apexcharts';
import { ApiService } from 'src/app/demo/service/api.service';
import { CurrencyService } from 'src/app/demo/service/currency.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  grid: ApexGrid;
};

@Component({
  selector: 'app-coindetails',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ],
  templateUrl: './coindetails.component.html',
  styleUrls: ['./coindetails.component.scss']
})
export class CoindetailsComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;
  coinData: any;
  coinId!: string;
  days: number = 30;
  currency: string = 'USD';

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private currencyService: CurrencyService) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: []
      },
      stroke: {
        curve: 'smooth'
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: 'Price Trends',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      }
    } as Partial<ChartOptions>;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.coinId = val['id'];
      this.getCoinData();
      this.getGraphData(this.days);
    });

    this.currencyService.getCurrency().subscribe(val => {
      this.currency = val;
      this.getGraphData(this.days);
      this.getCoinData();
    });
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe(res => {
      if (this.currency === 'USD') {
        res.market_data.current_price.inr = res.market_data.current_price.usd;
        res.market_data.market_cap.inr = res.market_data.market_cap.usd;
      }
      this.coinData = res;
    });
  }

  getGraphData(days: number) {
    this.days = days;
    this.api.getGraphicalCurrencyData(this.coinId, this.currency, this.days).subscribe(res => {
      this.chartOptions.series = [
        {
          name: 'Price',
          data: res.prices.map((price: any) => price[1])
        }
      ] as ApexAxisChartSeries;
      this.chartOptions.xaxis = {
        categories: res.prices.map((price: any) => {
          let date = new Date(price[0]);
          return this.days === 1 ? date.toLocaleTimeString() : date.toLocaleDateString();
        })
      } as ApexXAxis;
    });
  }
}
