import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { TemasService } from '../service/temas.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  foto = environment.foto
  id = environment.id

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private temaService: TemasService,
   
  ) { }

  ngOnInit() {
    console.log(environment.id)
  }

  sair(){
    this.router.navigate(['/entrar']);
    environment.token=''
    environment.nome_completo=''
    environment.foto=''
    environment.id=0
  }

}
