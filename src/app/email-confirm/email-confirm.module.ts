import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { EmailConfirmComponent } from './email-confirm.component';

@NgModule({
  declarations: [
    EmailConfirmComponent
  ],
  imports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class EmailConfirmModule { }
