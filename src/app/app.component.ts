import { AppService } from './app.service';
import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'fibonacci-ang';
  options: FormGroup;
  numberValidation = new FormControl(1, Validators.min(1));
  fiboData: any = [];
  ActivePost: boolean = false;
  n: any;

  constructor(fb: FormBuilder, private appService: AppService) {
    this.options = fb.group({
        numberValidation: this.numberValidation,

    });




  }




  ProcessAceptButton(n:any){
    var valor = n;


    this.getFibonacci(valor);

    if (this.ActivePost = true){
        this.calculateFibonacci(valor);

    }



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

      var fibo = {
        'id': valor,
        'serie': arreglo,
        'nesimoTermino': nesimoT
      };
      // nesimoT  nesimo termino
      //valor es el numero ingresado
      //arreglo es la serie

      this.postFibonacci(fibo);



  }

  getFibonacci(id:number){
    this.appService.getFibonacci(id)
    .subscribe((data:{})  =>  {
        this.fiboData = data;
        this.ActivePost = false;


    }, (error) =>{
      if (error.status == 404){
          this.ActivePost= true;
      }
    })
  }


  postFibonacci(fibo: any) {
    this.appService.postFibonacci(fibo).subscribe((data : {}) =>
      {
        this.fiboData = fibo;

      }
    )
    this.ActivePost= false;
  }





}
