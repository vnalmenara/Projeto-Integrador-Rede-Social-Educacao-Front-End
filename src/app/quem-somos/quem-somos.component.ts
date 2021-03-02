import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-quem-somos',
  templateUrl: './quem-somos.component.html',
  styleUrls: ['./quem-somos.component.css'],
})
export class QuemSomosComponent implements OnInit {
  constructor(private rota: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }
}
