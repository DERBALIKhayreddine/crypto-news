import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// project import
import { AdminComponent } from './demo/layout/admin';
import { EmptyComponent } from './demo/layout/empty';
import { HomeComponent } from './demo/pages/home/home.component';
import { RouterGuardService } from './demo/service/router-guard.service';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent,
    canActivate:[RouterGuardService],
    children: [
      {
        path: 'dashboard',
        canActivate:[RouterGuardService],
        loadComponent: () => import('./demo/pages/dashboard/dashboard.component')
      },
      {
        path: 'component',
        canActivate:[RouterGuardService],
        loadChildren: () => import('./demo/pages/ui-component/ui-component.module').then((m) => m.UiComponentModule)
      },
      {
        path: 'crypto',
        canActivate:[RouterGuardService],
        loadChildren: () => import('./demo/pages/coins/coins.module').then((m) => m.CoinsComponentModule)
      },
      {
        path:'articles',
        canActivate:[RouterGuardService],
        loadChildren :()=> import('./demo/pages/articles/articles.module').then((m)=>m.ArticlesComponentModule)
      },
      {
        path: 'sample-page',
        canActivate:[RouterGuardService],
        loadComponent: () => import('./demo/pages/sample-page/sample-page.component')
      },
    ]
  },
  {
    path: '',
    component: EmptyComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/auth/auth.module').then((m) => m.AuthModule)
      }
    ]
  },
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'home',
        loadComponent :() => import('./demo/pages/home/home.component').then((m)=>m.HomeComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
