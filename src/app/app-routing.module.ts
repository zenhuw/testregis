import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: "", redirectTo: "register", pathMatch: "full"},
  {path: "register", component: RegisterComponent},
  {path: "validation", component: EmailConfirmComponent},
  {path: "**", redirectTo: "register"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
