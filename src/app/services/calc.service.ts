import { Injectable } from '@angular/core';
import { HeatIndex } from '../models/heatIndex.model';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  calcHeatIndex(temp:number, unit: string, rh: number): HeatIndex {
    let resp: HeatIndex = {inC:0, inF: 0, status: ''};
    let tempF: number;

    if (unit === 'f') {
       tempF = temp;
    } else if (unit === 'c') {
       tempF = this.CtoF(temp);
    }
    
    resp.inF = +((this.doCalc(tempF, rh)).toFixed(2));
    resp.inC = this.FtoC(resp.inF);
    resp.status = this.assignStatus(resp.inF);
    
    return resp;
  }

  doCalc(T:number, rh: number) {
    return (-42.379) + (2.04901523 * T) + (10.14333127 * rh) - (0.22475541 * T * rh) - (6.83783e-3 * T**2) - (5.481717e-2 * rh**2) + (1.22874e-3 * T**2 * rh) + (8.5282e-4 * T * rh**2) - (1.99e-6 * T**2 * rh**2);
  }

  assignStatus(heatIndex: number): string {
    if (heatIndex < 77) return 'Normal';
    if (heatIndex >= 77 && heatIndex < 90) return 'Caution';
    if (heatIndex >= 90 && heatIndex < 105) return 'Extreme Caution';
    if (heatIndex >= 105 && heatIndex < 130) return 'Danger';
    if (heatIndex >= 130) return 'Extreme Danger';
  }

  CtoF(tempC: number): number {
    return +((tempC * 1.8 + 32).toFixed(2));
  }

  FtoC(tempF: number): number {
    return +(((tempF - 32) / 1.8).toFixed(2));
  }
}
