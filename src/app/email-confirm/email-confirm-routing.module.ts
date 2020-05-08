import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailConfirmComponent } from './email-confirm.component';


const routes: Routes = [
  {path: "", redirectTo: "", pathMatch: "full"},
  {path: "validation", component: EmailConfirmComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EmailConfirmRoutingModule { }
