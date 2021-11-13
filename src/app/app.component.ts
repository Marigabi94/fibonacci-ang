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

  constructor(fb: FormBuilder) {
    this.options = fb.group({
        numberValidation: this.numberValidation,
    });
  }

}
