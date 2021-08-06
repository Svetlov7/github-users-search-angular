import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import {MainLayoutComponent} from './components/core/main-layout/main-layout.component'
import {UsersListPageComponent} from './components/pages/users-list-page/users-list-page.component'
import {DetailPageComponent} from './components/pages/detail-page/detail-page.component'
import {ErrorPageComponent} from './components/pages/error-page/error-page/error-page.component'

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: 'blocks', component: UsersListPageComponent},
      {path: 'table', component: UsersListPageComponent},
      {path: 'detail/:id', component: DetailPageComponent},
    ]
  },
  {path: '404', component: ErrorPageComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
