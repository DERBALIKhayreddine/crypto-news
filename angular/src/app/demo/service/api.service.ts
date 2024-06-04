import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) { }


  getCurrency(currency:string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`);
  }
  getTrendingCurrency(currency:string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
  }
  getGraphicalCurrencyData(id: string, currency: string, days: number): Observable<any> {
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
      params: {
        vs_currency: currency,
        days: days.toString()
      }
    });
  }
  getCurrencyById(coinId:string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${coinId}`)
  }
}
