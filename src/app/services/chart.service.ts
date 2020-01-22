import { Injectable } from '@angular/core';
import { RecordsService } from './records.service';
import { Record } from '../models/record.model';
import { DataSet } from '../models/dataSet.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private records: Record[] = [];
  private returnData:{labels: string[], dataSets: DataSet[]} = {labels:[], dataSets:[]};

  constructor(private recordsService: RecordsService) { }

  getChartData() {
    this.returnData.dataSets = [];
    this.records = this.recordsService.getRecords();
    const labels = [];
    const theTempDataSet:DataSet = {label:'The Temp [°C]', data: []};
    const minTempDataSet:DataSet = {label:'Min Temp [°C]', data: []};
    const maxTempDataSet:DataSet = {label:'Max Temp [°C]', data: []};

    this.records.forEach( record => {
      labels.unshift(record.parsed_datetime);

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
