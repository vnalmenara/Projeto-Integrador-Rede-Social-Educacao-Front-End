import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';
import { TemasService } from '../service/temas.service';


@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css'],
})
export class TemasComponent implements OnInit {

  listaPostagens: Postagem[]
  idUser = environment.id
  postagem: Postagem = new Postagem()


  constructor(
    private router: Router,
    private postagemService: PostagemService
    ) {}

  ngOnInit() {
    window.scroll(0,0)

    if (environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.getAllPostagem()
  }

  getAllPostagem() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    })
  }
}
