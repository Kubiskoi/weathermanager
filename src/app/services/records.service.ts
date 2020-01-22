import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Record } from '../models/record.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private records: Record[] = [];
  public recordsSubjectChange = new Subject<Record[]>(); 

  constructor(private http: HttpClient) { }

  fetchRecords(day:number, month: number, year: number) {

    let params = new HttpParams();
    params = params.append('year',year.toString());
    params = params.append('month',month.toString());
    params = params.append('day',day.toString());

    // this.http.get<{status: string, records: Record[]}>('/api', { params: params })
    this.http.get<{status: string, records: Record[]}>('https://weproxyapi.herokuapp.com/api', { params: params })
    .pipe(map( responseData => {
      const newData:{status: string, records: Record[]} = {status: '', records:[]};
      if (responseData.status === 'ok') {
        newData.status = responseData.status;
        let i = 1;
        responseData.records.forEach( (record) => {
          record.no = i;
          const momentObj = moment.utc(record.created);
          record.parsed_datetime = momentObj.format('DD/MM/YYYY, hh:mm A');
          i++;
          newData.records.push(record);
        });
      }
      return newData;
    }))
    .subscribe( respData => {
      if (respData.status === 'ok') {
        this.records = respData.records;
        this.recordsSubjectChange.next(this.records.slice());
      } else if ( respData.status === 'error') {
        alert('server error')
      }
    });
  }

  getRecords() {
    return this.records.slice();
  }
}
