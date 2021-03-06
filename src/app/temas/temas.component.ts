import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemasService } from '../service/temas.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css'],
})

export class TemasComponent implements OnInit {
  
  tema: Tema = new Tema();
  idTema: any;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private temaService: TemasService) {}
    
    ngOnInit() {
      if (environment.token == '') {
        alert('Sua sessão expirou, faça o login novamente.');
        this.router.navigate(['/entrar']);
      }

      /*this.route.params.subscribe(params =>{
        return this.idTema = params;
      })
      this.findByIdTema(this.idTema);*/

    this.idTema = this.route.snapshot.params['id'];
    this.findByIdTema(this.idTema);

    }
    
  

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }


}
