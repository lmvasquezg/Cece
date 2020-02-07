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

  user_control = new FormControl('', [Validators.required]);
  psw_control = new FormControl('', [Validators.required])

  username = '';
  private password = '';

  async signInWithGoogle(): Promise<void> {
    await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(x => 
      this.username = this.user['email']
    );
    this.checkUser('google', this.username, '');
  }

  signOut(): void {
    this.authService.signOut();
  }

  async checkUser(type: string, username: string, password: string) {
    if (type == 'google') {
      await this.getUserGoogle(username);

    }
    else if (type == 'regular') {
      await this.getUser(username, password);
    }
  }

  signIn() {
    this.username = (document.getElementById('username') as HTMLInputElement).value;
    this.password = (document.getElementById('password') as HTMLInputElement).value;

    this.checkUser('regular', this.username, this.password);
  }

  getErrorMessage(type: string) {
    switch (type) {
      case "username":
        return this.user_control.hasError('required') ? 'Por favor ingrese su nombre de usuario' : '';
        break;
      case "password":
        return this.psw_control.hasError('required') ? 'Por favor ingrese su contraseña' : '';
        break;
    }
  }

  getUser(username: string, password: string) {
    const req = this.http.get(`${API_URL}/password/${username}`).subscribe(
      async res => {
        if (res != "Usuario no existe") {
          if (password == res) {
            this.username=username
            let url = '/products'//+this.username
            window.open(url, '_self', '', false);
            
          }
          else {
            this.openSnackBar("El usuario o contraseña son incorrectos", "Ok");
          }
        }
        else {
          this.openSnackBar("El usuario o contraseña son incorrectos", "Ok");
        }
      }
    )
  }

  getUserGoogle(username: string) {
    //const req = this.http.get(`${API_URL}/password/${username}`).subscribe(
      //async res => {
       // if (res != "Usuario no existe") {
          //this.username=username
          let url = '/products'//+this.username
          window.open(url, '_self', '', false);
          
          
      //  }
        //else {
       //   this.openSnackBar("El usuario o contraseña son incorrectos", "Ok");
       // }
      //}
    //)

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  
}
