import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ChartComponent } from './chart/chart.component';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/table' , pathMatch: 'full'},
  { path: 'table', component: TableComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: '**', redirectTo: '/table' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
