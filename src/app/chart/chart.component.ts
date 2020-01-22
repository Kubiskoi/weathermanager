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
  hasData = false;
  private chartData:{labels: string[], dataSets: DataSet[] } = {labels:[], dataSets:[]};
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  lineChartOptions = { 
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          callback: (tick, index, array) => {
            return (index % 3) ? "" : tick;
          }
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Temperature [°C]'
        }
      }]
    }
  };
  lineChartColors: Color[] = [
    { borderColor: 'black', backgroundColor: 'rgba(0,0,0,0)'},
    { borderColor: 'blue', backgroundColor: 'rgba(0,0,0,0)'},
    { borderColor: 'red', backgroundColor: 'rgba(0,0,0,0)'}
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  
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
