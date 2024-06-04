import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes =[
  {
    path:'',
    children:[
      {
        path:'allcoins',
        loadComponent :() => import('./allcoins/allcoins.component').then(m => m.default)
      },
      {
        path:'coin-detail/:id',
        loadComponent :()=>import('./coindetails/coindetails.component').then((m)=>m.CoindetailsComponent)
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinsComponentRoutingModule{}
