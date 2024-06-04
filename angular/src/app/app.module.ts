// angular import
import { NgModule } from '@angular/core';

// project import
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './demo/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center', }),
    QuillModule.forRoot()

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
