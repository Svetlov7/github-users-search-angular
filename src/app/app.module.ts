import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/core/app/app.component';
import { MainLayoutComponent } from './components/core/main-layout/main-layout.component';
import { UsersListPageComponent } from './components/pages/users-list-page/users-list-page.component';
import { DetailPageComponent } from './components/pages/detail-page/detail-page.component';

import { HttpClientModule } from '@angular/common/http';
import { BlockViewComponent } from './components/views/block-view/block-view.component';
import { TableViewComponent } from './components/views/table-view/table-view.component';
import { RefDirective } from './directives/ref/ref.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ErrorPageComponent } from './components/pages/error-page/error-page/error-page.component'

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    UsersListPageComponent,
    DetailPageComponent,
    BlockViewComponent,
    TableViewComponent,
    RefDirective,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [
    BlockViewComponent,
    TableViewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
