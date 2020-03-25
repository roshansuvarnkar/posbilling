import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';

import { CreatecategoryPage } from './createcategory.page';

const routes: Routes = [
  {
    path: '',
    component: CreatecategoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreatecategoryPage]
})
export class CreatecategoryPageModule {}
