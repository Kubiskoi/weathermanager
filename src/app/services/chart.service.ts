import { Injectable } from '@angular/core';
import { RecordsService } from './records.service';
import { Record } from '../models/record.model';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private records: Record[] = [];
  private returnData:{labels: string[], dataSets: []} = {labels:[], dataSets:[]};

  constructor(private recordsService: RecordsService) { }

  getChartData() {
    this.returnData.dataSets = [];
    this.records = this.recordsService.getRecords();
    const labels = [];
    const theTempDataSet:{label: string, data:number[]} = {label:'The Temp [°C]', data: []};
    const minTempDataSet:{label: string, data:number[]} = {label:'Min Temp [°C]', data: []};
    const maxTempDataSet:{label: string, data:number[]} = {label:'Max Temp [°C]', data: []};

    this.records.forEach( record => {
      // LABELS
      // GMT diff
      const localNow = new Date().getTimezoneOffset()*60;
      // ts in seconds
      const recordTimeStamp = new Date(record.created).getTime()/1000
      const momentObj = moment.unix( recordTimeStamp + localNow);
      labels.unshift(momentObj.format('hh:mm A'));

      // TEMPS
      theTempDataSet.data.unshift(+record.the_temp.toFixed(3));
      minTempDataSet.data.unshift(+record.min_temp.toFixed(3));
      maxTempDataSet.data.unshift(+record.max_temp.toFixed(3));
    })

    this.returnData.labels = labels;
    this.returnData.dataSets.push(theTempDataSet);
    this.returnData.dataSets.push(minTempDataSet);
    this.returnData.dataSets.push(maxTempDataSet);
    
    return this.returnData;
  }
}
