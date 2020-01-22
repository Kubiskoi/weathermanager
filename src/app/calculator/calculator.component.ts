import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  providers: [{provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },}]
})
export class CalculatorComponent implements OnInit {
  private calcForm: FormGroup;
  private units = ['c','f'];


  constructor() { }

  ngOnInit() {
    // var floatNum = 1.99e-6;    
    // console.log(floatNum);

    this.calcForm = new FormGroup({
      'temp': new FormControl(null),
      'unit': new FormControl('c'),
      'rh': new FormControl(null)
    });

        // this.signupForm.valueChanges.subscribe( 
    //   (value) => console.log(value)
    //  )

    this.calcForm.get('unit').valueChanges.subscribe(
      unit => {
        const temp = this.calcForm.get('temp').value;
        if (temp !== null) {
          if (unit === 'f') {
            console.log('from celsius to farenheit');
          } else if (unit === 'c') {
            console.log('from farenheit to celsius');
          }
        }
      }
    )
  }

  onSubmit() {
    console.log('submit');
    
    console.log(this.calcForm);
  }

}
