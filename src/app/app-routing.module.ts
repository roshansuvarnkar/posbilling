import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'createcategory', loadChildren: './createcategory/createcategory.module#CreatecategoryPageModule' },
  { path: 'createitems', loadChildren: './createitems/createitems.module#CreateitemsPageModule' },
  { path: 'items', loadChildren: './items/items.module#ItemsPageModule' },
  { path: 'categories', loadChildren: './categories/categories.module#CategoriesPageModule' },
  { path: 'quantityenter', loadChildren: './quantityenter/quantityenter.module#QuantityenterPageModule' },
  { path: 'receipt', loadChildren: './receipt/receipt.module#ReceiptPageModule' },
  { path: 'receipt-proceed', loadChildren: './receipt-proceed/receipt-proceed.module#ReceiptProceedPageModule' },
  { path: 'order-edit', loadChildren: './order-edit/order-edit.module#OrderEditPageModule' },
  { path: 'showreceipt', loadChildren: './showreceipt/showreceipt.module#ShowreceiptPageModule' },
  { path: 'show-receipt-details', loadChildren: './show-receipt-details/show-receipt-details.module#ShowReceiptDetailsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
