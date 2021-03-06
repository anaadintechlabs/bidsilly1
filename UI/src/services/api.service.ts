import { environment } from './../environments/environment';
import { JwtServiceService } from './jwt-service.service';
import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable ,  throwError } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtServiceService
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    console.log("path..."+environment.api_url+path);
    console.log("body..."+body);
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}