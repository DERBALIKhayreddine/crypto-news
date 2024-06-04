import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private baseUrl = 'http://localhost:3000/api';
  private categoryUrl = `${this.baseUrl}/category`;
  private articleUrl = `${this.baseUrl}/article`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Category Operations
  addNewCategory(data: any): Observable<any> {
    return this.http.post<any>(`${this.categoryUrl}/addNewCategory`, data, { headers: this.getHeaders() });
  }

  updateCategory(data: any): Observable<any> {
    return this.http.post<any>(`${this.categoryUrl}/updateCategory`, data, { headers: this.getHeaders() });
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.categoryUrl}/getAllCategories`, { headers: this.getHeaders() });
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.post<any>(`${this.categoryUrl}/deleteCategory`, { id }, { headers: this.getHeaders() });
  }

  // Article Operations
  addNewArticle(data: any): Observable<any> {
    return this.http.post<any>(`${this.articleUrl}/addNewArticle`, data, { headers: this.getHeaders() });
  }

  getAllArticles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.articleUrl}/getAllArticles`, { headers: this.getHeaders() });
  }

  updateArticle(data: any): Observable<any> {
    return this.http.post<any>(`${this.articleUrl}/updateArticle`, data, { headers: this.getHeaders() });
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.post<any>(`${this.articleUrl}/deleteArticle`, { id }, { headers: this.getHeaders() });
  }

  getArticleById(id: number): Observable<any> {
    return this.http.post<any>(`${this.articleUrl}/getArticleById`, { id }, { headers: this.getHeaders() });
  }

  getAllPublishedArticles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.articleUrl}/getAllPublishedArticles` );
  }
  updateArticleStatus(id: number, statusData: any): Observable<any> {
    return this.http.post<any>(
      `${this.articleUrl}/updateArticleStatus`,
      { id, status: statusData }, // Updated to send status with the key 'status'
      { headers: this.getHeaders() }
    );
  }


}
