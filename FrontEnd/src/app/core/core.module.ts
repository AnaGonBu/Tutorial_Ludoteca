import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  
  
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule, 
    MatToolbarModule,
    HeaderComponent,
<<<<<<< HEAD
    MatDatepickerModule,
    MatNativeDateModule
=======
    MatNativeDateModule,
    MatDatepickerModule
>>>>>>> c11e36e327fc8c4cbd990fea75c6804fdac28f5d
  ], 
  
  exports: [
  HeaderComponent,
  MatDatepickerModule, 
  MatNativeDateModule
  ]
})
export class CoreModule { }
