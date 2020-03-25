import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';

import { ReceiptPage } from './receipt.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiptPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReceiptPage]
})
export class ReceiptPageModule {}
