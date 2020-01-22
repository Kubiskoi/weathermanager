import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartService } from '../services/chart.service';
import { DataSet } from '../models/dataSet.model';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  private hasData = false;
  private chartData:{labels: string[], dataSets: DataSet[] } = {labels:[], dataSets:[]};
  private lineChartData: ChartDataSets[] = [];
  private lineChartLabels: Label[] = [];
  private lineChartOptions = { 
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Temperature [°C]'
        }
      }]
    }
  };
  private lineChartColors: Color[] = [
    { borderColor: 'black', backgroundColor: 'rgba(0,0,0,0)'},
    { borderColor: 'blue', backgroundColor: 'rgba(0,0,0,0)'},
    { borderColor: 'red', backgroundColor: 'rgba(0,0,0,0)'}
  ];
  private lineChartLegend = true;
  private lineChartPlugins = [];
  private lineChartType = 'line';
  
  constructor(private chartService: ChartService) { }

  ngOnInit() {
    this.chartData = this.chartService.getChartData();

    if (this.chartData.labels.length !== 0) {
      this.hasData = true;
      this.lineChartLabels = this.chartData.labels;
      this.lineChartData = this.chartData.dataSets;
    }        
  }
}
