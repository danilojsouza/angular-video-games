import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

import { APIResponse, Game } from '../api.models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  findAll(ordenacao: string, pesquisa?: string): Observable<APIResponse<Game>> {
    let parametros;

    if (pesquisa)
      parametros = new HttpParams().set('ordering', ordenacao).set('search', pesquisa);
    else
      parametros = new HttpParams().set('ordering', ordenacao);

    return this.http.get<APIResponse<Game>>(`${env.API_URL}/games`, { params: parametros });
  }
}
