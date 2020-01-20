import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private http: HttpClient) { }

  fetchRecords() {
    this.http.get('https://www.metaweather.com/api/location/44418/2018/4/30/').subscribe( respData => {
      console.log(respData);
    });
  }
}
