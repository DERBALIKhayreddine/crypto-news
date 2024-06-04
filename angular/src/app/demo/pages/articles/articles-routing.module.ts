import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
const routes: Routes =[
  {
    path:'allarticles',
    loadComponent :() =>import ('./all-articles/all-articles.component').then(m=>m.AllArticlesComponent)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesComponentRoutingModule{}
