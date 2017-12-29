import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css'],
  styles:[
    `
    .highlight{
      background-color: yellowgreen;
      font-weight: bold;
  }`
  ]
})
export class DataBindingComponent implements OnInit {
  url: string = 'http://loiane.com';
  cursoAngular: boolean = true;
  urlImagem = 'http://lorempixel.com/400/200/sports/';

  valorAtual: string = '';
  valorSalvo: string = '';
  isMouseOver: boolean = false;

  nomeDoCurso: string = 'Angular';

  constructor() { }

  onMudouValor(evento){
    console.log(evento);
  }
  ngOnInit() {
  }

  getValor(){
    return 1;
  }

  getCurtirCurso(){
    return true;
  }
  botaoClicado(){
    alert('Botão clicado');
  }

  onKeyUp(evento: KeyboardEvent){
    console.log((<HTMLInputElement>evento.target).value);
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }

  salvarValor(valor){
    this.valorSalvo = valor;
  }
  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver
  }
}
