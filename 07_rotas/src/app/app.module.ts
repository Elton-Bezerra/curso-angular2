import { SweetAlertService } from 'ng2-sweetalert2';
import { AlunosGuard } from './guards/alunos.guard';
import { CursosGuard } from './guards/cursos.guard';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,     
    CabecalhoComponent,
    PaginaNaoEncontradaComponent 
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    AppRoutingModule,
    FormsModule
    
  ],
  providers: [
    AuthService, AuthGuard, CursosGuard, AlunosGuard, SweetAlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
