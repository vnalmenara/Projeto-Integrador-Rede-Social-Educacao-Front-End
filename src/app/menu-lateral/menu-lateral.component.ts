import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { User } from '../model/User';
import { PostagemService } from '../service/postagem.service';
import { TemasService } from '../service/temas.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css'],
})
export class MenuLateralComponent implements OnInit {
  postagem: Postagem = new Postagem();
  user: User = new User();
  listaPostagens: Postagem[];
  idUser = environment.id;
  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temasService: TemasService
  ) {}

  ngOnInit(): void {}

  postar() {
    this.user.id = this.idUser;
    this.postagem.usuario = this.user;

    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
        alert('Postagem realizada com sucesso!');
        this.postagem = new Postagem();
        this.getAllPostagem();
      });
  }
  getAllPostagem() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
  }
}
