import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { ShowReceiptDetailsPage } from './show-receipt-details.page';

const routes: Routes = [
  {
    path: '',
    component: ShowReceiptDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowReceiptDetailsPage]
})
export class ShowReceiptDetailsPageModule {}
