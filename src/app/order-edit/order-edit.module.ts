import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';

import { OrderEditPage } from './order-edit.page';

const routes: Routes = [
  {
    path: '',
    component: OrderEditPage
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
  declarations: [OrderEditPage]
})
export class OrderEditPageModule {}
