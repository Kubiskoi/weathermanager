import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(private recordsService: RecordsService) { }

  ngOnInit() {
    this.recordsService.fetchRecords();
    this.recordsSubscription = this.recordsService.recordsSubjectChange.subscribe(
      (records: Record[]) => {
        this.records = records;
      }
    )
  }

  ngOnDestroy() {
    this.recordsSubscription.unsubscribe();
  }

}
