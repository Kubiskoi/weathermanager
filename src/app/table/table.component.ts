import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecordsService } from '../services/records.service';
import { Subscription } from 'rxjs';
import { Record } from '../models/record.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  private records: Record[] = [];
  private recordsSubscription: Subscription;
  private hasData = false;
  private loading = false;

  private displayedColumns: string[] = ['no' ,'created', 'weather_state_name','temperature' ,'air_pressure' ,'humidity' ,'wind_speed', 'visibility', 'predictability'];
  private maxDate = new Date();

  private dateForm: FormGroup;

  constructor(
    private recordsService: RecordsService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.dateForm = this.fb.group({
      date: new Date()
    });

    this.recordsSubscription = this.recordsService.recordsSubjectChange.subscribe(
      (records: Record[]) => {
        this.records = records;  
        this.hasData = true; 
        this.loading = false;     
      }
    )
  }

  onSubmit() {
    this.loading = true;

    const date = new Date(this.dateForm.value.date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1);
    const day = date.getDate();
     
    this.recordsService.fetchRecords(day, month, year);
  }

  ngOnDestroy() {
    this.recordsSubscription.unsubscribe();
  }

}
