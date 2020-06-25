import { JwtServiceService } from './../services/jwt-service.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { HttpRequest } from '@angular/common/http/src/request';
import { HttpHandler } from '@angular/common/http/src/backend';
import { Observable } from 'rxjs/internal/Observable';
import { HttpEvent } from '@angular/common/http/src/response';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenInterceptorService  implements HttpInterceptor {

  constructor(private jwtService: JwtServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.jwtService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }

}
