import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpGoogleComponent } from './sign-up-google/sign-up-google.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProductsComponent } from './products/products.component';

  

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'signUpGoogle',
    component: SignUpGoogleComponent
  },
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
