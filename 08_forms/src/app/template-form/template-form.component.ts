import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario:any = { 
    nome: null,
    email: null
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form){
    console.log(form);

    console.log(form.value);
    
  }

  validaNome(nome){
    return !nome.valid && nome.touched;
  }
  
  validaEmail(email){
    return !email.valid && email.touched;
  }

  validaCep(cep){
    return !cep.valid && cep.touched;

  }

}
