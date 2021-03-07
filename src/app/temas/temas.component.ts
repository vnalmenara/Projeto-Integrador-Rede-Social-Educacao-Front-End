import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';
import { Tema } from '../model/Tema';
import { TemasService } from '../service/temas.service';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css'],
})

export class TemasComponent implements OnInit {
  user: User = new User();
  idUser = environment.id;

  listaPostagens: Postagem[];
  postagem: Postagem = new Postagem();
  curtida = this.postagem.interacao;
  
  tema: Tema = new Tema();
  idTema: number;

  key = 'data';
  reverse = true;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private route: ActivatedRoute,
    private temaService: TemasService,
    private alertas: AlertasService,
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente.');
      this.router.navigate(['/entrar']);
    }

    this.idTema = this.route.snapshot.params['id'];
    this.getAllPostagemByTema(this.idTema);
    this.findByIdTema(this.idTema);

    /*this.route.params.subscribe(params =>{
        return this.idTema = params;
      })
      this.findByIdTema(this.idTema);*/

    /*this.router.events.subscribe(event =>{
        if (event instanceof NavigationEnd){
          this.idTema = event;
          this.findByIdTema(this.idTema);
        }
      })*/
  }

  getAllPostagem() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
  }

  getAllPostagemByTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp;
      this.listaPostagens = this.tema.postagem
    })
  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  postar() {
    this.user.id = this.idUser;
    this.postagem.usuario = this.user;
    this.tema.id = Number(this.idTema);
    this.postagem.tema = this.tema;  

    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
        alert('Postagem realizada com sucesso!');
        this.postagem = new Postagem();
        this.getAllPostagemByTema(this.idTema);
      });
  }

  curtir() {
    if (this.curtida == null) {
      this.curtida = 1;
    } else {
      this.curtida += 1;
    }
  }
}
