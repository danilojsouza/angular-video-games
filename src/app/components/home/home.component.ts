import { HttpService } from './../../services/http.service';
import { Game, APIResponse } from './../../api.models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public ordem: string = "";
  public jogos: Array<Game> = [];

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['game-search'])
        this.searchGames('metacrit', params['game-search']);
      else
        this.searchGames('metacrit');
    });
  }
  searchGames(ordem: string, pesquisa?: any): void {
    this.httpService.findAll(ordem, pesquisa).subscribe((listaJogos: APIResponse<Game>) => {
      this.jogos = listaJogos.results;
    });
  }

}
