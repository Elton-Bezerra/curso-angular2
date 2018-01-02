import { EstadoBr } from './../shared/models/estado-br';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';

import { DropdownService } from './../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {


  formulario: FormGroup;
  estados: EstadoBr[];

  constructor(
    private formBuilder: FormBuilder,
    private http: Http,
    private dropdownService: DropdownService
  ) { }

  ngOnInit() {
    this.dropdownService.getEstadosBr()
      .subscribe(dados => {this.estados = dados; console.log(this.estados)});
    /*this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
      
      endereco: new FormGroup({
        cep: new FormControl(null),
        //ETC..
      })

    });*/

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })

    });

  }

  onSubmit() {
    console.log(this.formulario);
    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .map(res => res)
        .subscribe(dados => {
          console.log(dados);
          //reseta o formulário
          this.resetar();
        },
        (error: any) => console.log(error));
    } else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario);

    }

  }

  verificaValidacoesForm(formGroup: FormGroup) {

    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if(controle instanceof FormGroup){
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.validador(campo),
      'has-feedback': this.validador(campo)
    }
  }

  validador(campo: string) {
    return !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && (campoEmail.touched || campoEmail.dirty));
    }
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep').value;
    // nova variavel cep com somente os valores numericos
    cep = cep.replace(/\D/g, '');
    if (cep != '') {
      // expressão regular para validar o cep
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {

        this.resetaDadosForm();
        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .map(dados => dados.json())
          .subscribe(dados => this.populaDadosForm(dados));
      }
    }

  }

  resetaDadosForm() {
    this.formulario.patchValue({
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


  populaDadosForm(dados) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    this.formulario.get('nome').setValue('eltun');
  }
}
