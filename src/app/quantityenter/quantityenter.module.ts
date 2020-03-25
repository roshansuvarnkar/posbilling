import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';

import { QuantityenterPage } from './quantityenter.page';

const routes: Routes = [
  {
    path: '',
    component: QuantityenterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuantityenterPage]
})
export class QuantityenterPageModule {}
