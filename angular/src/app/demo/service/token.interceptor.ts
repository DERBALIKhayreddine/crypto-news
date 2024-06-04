import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');

    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 403) {
            const currentUrl = this.router.url;
            if (currentUrl !== '/login') {
              localStorage.removeItem('accessToken');
              this.router.navigate(['/home']);
            }
          }
        }
        return throwError(error);
      })
    );
  }
}
