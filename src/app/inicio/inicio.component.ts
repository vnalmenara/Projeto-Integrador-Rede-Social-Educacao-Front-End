import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { PostagemService } from '../service/postagem.service';
import { TemasService } from '../service/temas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  postagem: Postagem = new Postagem();
  tema: Tema = new Tema();
  user: User = new User();

  listaPostagens: Postagem[];
  listaTemas: Tema[];

  buscaDescricaoPostagem: string;
  buscaTagPostagem: string;
  idTema: number;

  idUser = environment.id;
  foto = environment.foto;
  nomeUser = environment.nome_completo;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temasService: TemasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    if (environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente.');
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
        alert('Postagem realizada com sucesso!');
        this.postagem = new Postagem();
        this.getAllPostagem();
      });
  }
}
