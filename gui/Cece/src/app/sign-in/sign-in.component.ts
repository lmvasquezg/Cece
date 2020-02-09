import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';

import { API_URL } from '../env';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'] 
})
export class SignInComponent implements OnInit {
  
  user: SocialUser;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }



  username = '';
  private password = '';

  //Peticion a google para inicio de sesion
  async signInWithGoogle(): Promise<void> {
    await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(x => 
      this.username = this.user['email']
    );
    this.checkUser('google', this.username, '');
  }

  //Cierre de sesion
  signOut(): void {
    this.authService.signOut();
  }

  async checkUser(type: string, username: string, password: string) {
    if (type == 'google') {
      await this.getUserGoogle(username);
    }
  }

  //Reenvio a pagina de reporte de datos
  getUserGoogle(username: string) {
          let url = '/data'//+this.username
          window.open(url, '_self', '', false);
  }

  
}
