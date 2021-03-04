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


  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  listaTemas: Tema[]
  tema: Tema = new Tema()
  idTema: number
  user: User= new User()
  idUser= environment.id
  foto = environment.foto;
  nomeUser=environment.nome_completo;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temasService: TemasService
  ) {}
 
  ngOnInit() {
    if (environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.getAllPostagem()
  }
  
  getAllTemas() {
    this.temasService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    })
  }

  findByIdTema() {
    this.temasService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    })
  }

  getAllPostagem() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    })
  }

  postar() {
    this.user.id = this.idUser
    this.postagem.usuario = this.user
    
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem();
      this.getAllPostagem();

    })

  }
}
