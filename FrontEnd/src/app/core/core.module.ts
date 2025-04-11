import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';



@NgModule({
  
  
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule, 
    MatToolbarModule,
    HeaderComponent,
    MatNativeDateModule,
    MatDatepickerModule
  ], 
  
  exports: [
  HeaderComponent,
  MatDatepickerModule, 
  MatNativeDateModule
  ]
})
export class CoreModule { }
