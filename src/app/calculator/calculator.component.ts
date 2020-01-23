import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { CalcService } from '../services/calc.service';
import { HeatIndex } from '../models/heatIndex.model';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../services/storage.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  providers: [{provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },}]
})
export class CalculatorComponent implements OnInit, OnDestroy {
  calcForm: FormGroup;
  units = ['c','f'];
  heatIndex: HeatIndex;
  hasHeatIndexValue = false;
  heatIndexRecords: HeatIndex[] = [];
  // heatIndexRecordsSubscripion: Subscription;

  constructor(
    private calcService: CalcService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {

    this.calcForm = new FormGroup({
      'temp': new FormControl(null, [Validators.required, this.unitMin.bind(this)]),
      'unit': new FormControl('c'),
      'rh': new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100) ])
    });

    this.calcForm.get('unit').valueChanges.subscribe(
      unit => {
        const temp = this.calcForm.get('temp').value;
        if (temp !== null) {
          let newTemp;
          if (unit === 'f') {
            newTemp = this.calcService.CtoF(temp);
          } else if (unit === 'c') {
            newTemp = this.calcService.FtoC(temp);
          };
          this.calcForm.patchValue({
            'temp': newTemp
          });
          this.calcForm.controls['temp'].updateValueAndValidity();
        }
      }
    );
    
    this.heatIndexRecords = this.localStorageService.getHeatIndexes();

    // this.heatIndexRecords = this.calcService.getHeatIndexRecords();
    // this.heatIndexRecordsSubscripion = this.calcService.recordsSubjectChange.subscribe(
    //   (records: HeatIndex[]) => {
    //     this.heatIndexRecords = records;
    //   }
    // );
  }

  onSubmit() {
    this.hasHeatIndexValue = false;

    this.heatIndex = this.calcService.calcHeatIndex(
      this.calcForm.value.temp,
      this.calcForm.value.unit,
      this.calcForm.value.rh,
    );

    this.hasHeatIndexValue = true;

    this.localStorageService.store(this.heatIndex);
    this.heatIndexRecords = this.localStorageService.getHeatIndexes();
  }

  unitMin(control: FormControl): {[s: string]: boolean} {    
    if (this.calcForm && control.value) {
      const unit = this.calcForm.value.unit;
      if (unit === 'c' && control.value < 26.7) {
        return {'cMin': true};
      } else if (unit === 'f' && control.value < 80) {
        return {'fMin': true};
      };
    };
    return null;
  }

  onClearHIrecords() {
    this.localStorageService.clearStorage();
    this.heatIndexRecords = [];
  }

}