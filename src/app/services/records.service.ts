import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Record } from '../models/record.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private records: Record[] = [];
  public recordsSubjectChange = new Subject<Record[]>(); 

  constructor(private http: HttpClient) { }

  fetchRecords() {
    let params = new HttpParams();
    params = params.append('year','2018');
    params = params.append('month','04');
    params = params.append('day','30');

    this.http.get<{status: string, records: Record[]}>('/api', { params: params }).subscribe( respData => {
      if (respData.status === 'ok') {
        this.records = respData.records;
        this.recordsSubjectChange.next(this.records.slice());
      } else if ( respData.status === 'error') {
        alert('server error')
      }
    });
  }
}
