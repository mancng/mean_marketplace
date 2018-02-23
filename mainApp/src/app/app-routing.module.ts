import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { MylistComponent } from './mylist/mylist.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'create', component: CreateComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'listings', component: MylistComponent },
  { path: '', pathMatch: 'full', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
