import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  };

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onSubmit(form) {
    // console.log(form);

    console.log(JSON.stringify(form.value));

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .map(res => res)
      .subscribe(dados => {
        console.log(dados);
        form.form.reset();
      });

  }

  validador(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.validador(campo),
      'has-feedback': this.validador(campo)
    }
  }

  consultaCEP(cep, form) {
    // nova variavel cep com somente os valores numericos
    cep = cep.replace(/\D/g, '');
    if (cep != '') {
      // expressão regular para validar o cep
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {

        this.resetaDadosForm(form);
        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .map(dados => dados.json())
          .subscribe(dados => this.populaDadosForm(dados, form));

        // $.getJSON(`//viacep.com.br/ws/`)
      }
    }
  }

  populaDadosForm(dados, formulario) {
    // console.log(formulario.value);
    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     rua: dados.logradouro,
    //     cep: dados.cep,
    //     numero: formulario.value.endereco.numero ? formulario.value.endereco.numero : dados.complemento,
    //     complemento: formulario.value.endereco.complemento ? formulario.value.endereco.complemento : dados.complemento,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf
    //   }
    // });

    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        cep: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
}
