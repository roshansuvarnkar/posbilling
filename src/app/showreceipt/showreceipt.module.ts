import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ShowreceiptPage } from './showreceipt.page';

const routes: Routes = [
  {
    path: '',
    component: ShowreceiptPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowreceiptPage]
})
export class ShowreceiptPageModule {}
