import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';
import { TemasService } from '../service/temas.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css'],
})
export class MenuLateralComponent implements OnInit {
  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];
  
  user: User = new User();
  idUser = environment.id;

  tema: Tema = new Tema();
  idTema = this.route.snapshot.params['id'];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temasService: TemasService,
    private alertas: AlertasService
  ) {}

  ngOnInit(){}

  postar() {
    this.user.id = this.idUser;
    this.postagem.usuario = this.user;
    this.tema.id = Number(this.idTema);
    this.postagem.tema = this.tema;  

    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
        this.alertas.showAlertSuccess('Postagem realizada com sucesso!');
        this.postagem = new Postagem();
        
      });
  }

  
}
