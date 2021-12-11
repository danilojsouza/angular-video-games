import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiKey } from 'src/config'

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

  //Método do HttpInterceptor
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      //Token da API https://rapidapi.com/accujazz/api/rawg-video-games-database/
      setHeaders: {
        'X-Rapidapi-Host': 'rawg-video-games-database.p.rapidapi.com',
        'X-Rapidapi-Key': 'a3b3acdf99msh53775c22f176647p1f3ebdjsn555f1d5bae6a'
      },
      setParams: { //Key da API https://api.rawg.io/docs/
        key: apiKey()
      }
    });
    return next.handle(req);
  }

}
