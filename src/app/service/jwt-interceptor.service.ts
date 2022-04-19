import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const currentUser = this.auth.currentUserValue;

      if (currentUser && currentUser.token) {
        req = req.clone({ //KLÓNOZNI KELL, KÜLÖNBEN VÉGTELEN CIKLUS
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}` //TOKEN INJEKTÁLÁSA A HTTP HÍVÁSOKBA
          }
        });
      }

      return next.handle(req);
    }
}
