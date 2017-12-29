import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onSubmit(form){
    console.log(form);

    console.log(form.value);
    
  }

  validador(campo){
    return !campo.valid && campo.touched;
  }  

  aplicaCssErro(campo){
    return {
      'has-error' : this.validador(campo),
      'has-feedback' : this.validador(campo)  
    }
  }

  consultaCEP(cep){
    // nova variavel cep com somente os valores numericos
    cep = cep.replace(/\D/g, '');
    if(cep != ''){
      // expressão regular para validar o cep
      var validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)){  
        
        this.http.get(`//viacep.com.br/ws/${cep}/json`)
        .map( dados => dados.json())
        .subscribe(dados => console.log(dados));
        
        // $.getJSON(`//viacep.com.br/ws/`)
      }
    }


  }
}
