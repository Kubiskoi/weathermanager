import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { RecordsService } from '../services/records.service';
import { Subscription } from 'rxjs';
import { Record } from '../models/record.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  btnText: string = 'Load Records';
  private recordsSubscription: Subscription;
  hasData = false;
  loading = false;

  displayedColumns: string[] = ['no' ,'created', 'weather_state_name','the_temp' ,'air_pressure' ,'humidity' ,'wind_speed', 'visibility', 'predictability'];
  dataSource: MatTableDataSource<Record>;
  maxDate = new Date();

  dateForm: FormGroup;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(
    private recordsService: RecordsService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.dateForm = this.fb.group({
      date: [new Date(), Validators.required]
    });

    this.recordsSubscription = this.recordsService.recordsSubjectChange.subscribe(
      (records: Record[]) => {
        this.btnText = 'Reload Records';
        this.dataSource = new MatTableDataSource(records);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.hasData = true; 
        this.loading = false;     
      }
    );

    // check if data were loaded before
    const recordsCheck = this.recordsService.getRecords();
    if (recordsCheck.length !== 0) {
      this.dataSource = new MatTableDataSource(recordsCheck);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.btnText = 'Reload Records';
      this.hasData = true;
    };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit() {
    this.loading = true;

    // empty table while request getting data
    this.dataSource = new MatTableDataSource([]);

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
