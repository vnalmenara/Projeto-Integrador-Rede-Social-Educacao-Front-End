import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';
import { Tema } from '../model/Tema';
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
  tema: Tema = new Tema();
  idTema: any;


  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private route: ActivatedRoute,
    private temaService: TemasService
    ) {}

  ngOnInit() {
    window.scroll(0,0)

    if (environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.getAllPostagem()
    this.idTema = this.route.snapshot.params['id'];
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
  }
  
  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }


}
