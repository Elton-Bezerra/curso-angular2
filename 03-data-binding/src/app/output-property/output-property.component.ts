import { Component, ViewChild, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';


@Component({
  selector: 'contador',
  templateUrl: './output-property.component.html',
  styleUrls: ['./output-property.component.css']
})
export class OutputPropertyComponent implements OnInit {

  @Input() valor: number = 9;
  

  @Output() mudouValor = new EventEmitter();

  @ViewChild('campoInput') campoValorInput: ElementRef;

  incrementa(){
    console.log(this.campoValorInput);
    this.mudouValor.emit({evento: 'incrementa', novoValor: this.campoValorInput.nativeElement.value});    
    this.campoValorInput.nativeElement.value++;
  }

  decrementa(){
    console.log(this.campoValorInput);
    this.mudouValor.emit({evento: 'decrementa', novoValor: this.campoValorInput.nativeElement.value});    
    this.campoValorInput.nativeElement.value--;
  }
  constructor() { }

  ngOnInit() {
  }

}
