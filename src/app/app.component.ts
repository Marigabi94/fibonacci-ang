import { AppService, Fibonacci } from './app.service';
import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fibonacci-ang';
  options: FormGroup;
  numberValidation = new FormControl(1, Validators.min(1));
  fibonacci: Fibonacci | undefined;

  constructor(fb: FormBuilder, private appService: AppService) {
    this.options = fb.group({
        numberValidation: this.numberValidation,
    });
  }


  ProcessAceptButton(n:any){
    var valor = n;

    console.log(valor);

    this.calculateFibonacci(parseInt(valor));

  }

  calculateFibonacci(valor: number){

      var x = 0;
      var arreglo: any = [];

      for (x; x<valor; x++){
        if(x==0){
          arreglo.push(0);
        }
        else if(x==1){
          arreglo.push(1);
        }
        else{
          arreglo.push(arreglo[x-1]+arreglo[x-2]);
        }
      }
      let nesimoT = arreglo[arreglo.length-1];
      // nesimoT  nesimo termino
      //valor es el numero ingresado
      //arreglo es la serie
      console.log(nesimoT);
      console.log(valor);
      console.log(arreglo);
      this.putFibonacci(valor, arreglo, nesimoT);
  }

  getFibonacci(){
    this.appService.getFibonacci()
    .subscribe((data: Fibonacci)  =>  this.fibonacci = {
        numero: data.numero,
        serie:  data.serie,
        nesimoTermino: data.nesimoTermino,
    });
  }

  putFibonacci(valor: any, arreglo: any, nesimoT: any){
    this.appService.putFibonacci(valor,arreglo, nesimoT)
    .subscribe((data: Fibonacci)  =>  this.fibonacci = {
        numero: data.numero,
        serie:  data.serie,
        nesimoTermino: data.nesimoTermino,
    });
  }


}
