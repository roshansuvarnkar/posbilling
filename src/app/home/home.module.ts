import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
