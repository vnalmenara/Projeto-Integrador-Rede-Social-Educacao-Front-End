import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { TemasComponent } from './temas/temas.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';


const routes: Routes = [
  { path: '', redirectTo: 'entrar', pathMatch: 'full' },

  {path: 'entrar', component: EntrarComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'inicio', component: InicioComponent},
  {path:'tema/:id', component: TemasComponent},
  {path: 'user-edit/:id', component: UserEditComponent},
  {path: 'quem-somos', component: QuemSomosComponent},
  {path: 'postagem-edit/:id', component:PostagemEditComponent},
  {path: 'postagem-delete/:id', component:PostagemDeleteComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
