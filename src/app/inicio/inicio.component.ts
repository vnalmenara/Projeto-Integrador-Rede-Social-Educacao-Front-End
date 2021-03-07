import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';
import { TemasService } from '../service/temas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  user: User = new User();
  tema: Tema = new Tema();
  postagem: Postagem = new Postagem();

  curtida = this.postagem.interacao;
  descricao = this.postagem.descricao;

  listaPostagens: Postagem[];
  listaTemas: Tema[];

  buscaDescricaoPostagem: string;
  buscaTagPostagem: string;
  idTema: number;

  idUser = environment.id;
  foto = environment.foto;
  nomeUser = environment.nome_completo;

  key = 'data';
  reverse = true;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temasService: TemasService,
    private alertas: AlertasService,
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente.');
      this.router.navigate(['/entrar']);
    }

    this.getAllPostagem();
  }

  getAllTemas() {
    this.temasService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  findByIdTema() {
    this.temasService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  findByDescricaoPostagem() {
    if (this.buscaDescricaoPostagem == '') {
      this.getAllPostagem();
    } else {
      this.postagemService
        .getByDescricaoPostagem(this.buscaDescricaoPostagem)
        .subscribe((r: Postagem[]) => {
          this.listaPostagens = r;
        });
    }
  }

  findByTagPostagem() {
    if (this.buscaDescricaoPostagem == '') {
      this.getAllPostagem();
    } else {
      this.postagemService
        .getByTagPostagem(this.buscaTagPostagem)
        .subscribe((r: Postagem[]) => {
          this.listaPostagens = r;
        });
    }
  }

  getAllPostagem() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
  }

  postar() {
    this.user.id = this.idUser;
    this.postagem.usuario = this.user;

    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
        this.alertas.showAlertSuccess('Postagem realizada com sucesso!');
        this.postagem = new Postagem();
        this.getAllPostagem();
      });
  }

  curtir() {
    if (this.curtida == null) {
      this.curtida = 1;
      //this.postagem.interacao = this.curtida

      // this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      //  this.postagem = resp;
      // })
    } else {
      this.curtida += 1;
      //this.postagem.interacao = this.curtida

      //this.postagem.descricao = this.descricao

      // this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      //this.postagem = resp;
      // })
    }
  }
}
