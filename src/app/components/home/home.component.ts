import { HttpService } from './../../services/http.service';
import { Game, APIResponse } from './../../api.models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public ordem: string = "";
  public jogos: Array<Game> = [];
  private routerSub!: Subscription;
  private gameSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routerSub = this.activatedRoute.params.subscribe((params: Params) => {
      if(params['game-search'])
        this.searchGames('metacrit', params['game-search']);
      else
        this.searchGames('metacrit');
    });
  }
  searchGames(ordem: string, pesquisa?: any): void {
    this.gameSub = this.httpService.findAll(ordem, pesquisa).subscribe((listaJogos: APIResponse<Game>) => {
      this.jogos = listaJogos.results;
    });
  }

  openGameDetails(id: number):void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if(this.gameSub)
      this.gameSub.unsubscribe();

    if(this.routerSub)
      this.routerSub.unsubscribe();
  }
}
