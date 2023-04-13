import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LibraryComponent } from './library/library.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { Book } from './book';


const routes: Routes = [
  
  {path: '', component:HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component:LoginComponent},
  {path: 'books', component: LibraryComponent},
  {path : 'books/new', component : AddBookComponent},
  {path : 'books/edit/:id', component: EditBookComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
