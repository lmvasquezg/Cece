import { Component, OnInit } from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';

import { API_URL } from '../env';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-sign-up-google',
  templateUrl: './sign-up-google.component.html',
  styleUrls: ['./sign-up-google.component.css']
})
export class SignUpGoogleComponent implements OnInit {

  user: SocialUser;
  message = 'Iniciar Sesión con Google';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private authService: AuthService) { }
  
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  genderOptions = [
    'Hombre',
    'Mujer',
    'Otro'
  ];
    
  age_control = new FormControl('', [Validators.required, Validators.min(1)]);
  city_control = new FormControl('', [Validators.required]);
  country_control = new FormControl('', [Validators.required]);
  address_control = new FormControl('', [Validators.required]);
  gender_control = new FormControl('', [Validators.required]);
  
  name;
  age;
  city;
  country;
  address;
  email;
  gender;
  username;
  password;

  signedIn = false;

  async signInWithGoogle(): Promise<void> {
    await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(x => 
      this.name = this.user['name']
    );
    this.email = this.user['email'];

    if (this.user) {
      this.signedIn = true;
      this.message = "Sesión iniciada";
    }
  }

  signOut(): void {
    this.authService.signOut();
  }

  getErrorMessage(type: string) {
    switch(type) {
      case "age":
        return this.age_control.hasError('required') ? 'Por favor ingrese su edad' :
               this.age_control.hasError('min') ? 'Por favor ingrese una edad valida':
               '';
        break;
      case "city":
        return this.city_control.hasError('required') ? 'Por favor ingrese su ciudad de residencia' : '';
        break;
      case "country":
        return this.country_control.hasError('required') ? 'Por favor ingrese su país de residencia' : '';
        break;
      case "address":
        return this.address_control.hasError('required') ? 'Por favor ingrese su dirección' : '';
        break;
      case "gender":
        return this.gender_control.hasError('required') ? 'Por favor seleccione una opción' : '';
        break;
    }
  }

  createUser() {
    if (this.age_control.invalid || this.city_control.invalid || this.country_control.invalid || this.address_control.invalid || this.gender_control.invalid) {
      if (this.age_control.hasError('min')) {
        this.openSnackBar("Ingrese una edad valida", "Ok");
      }
      else{
        this.openSnackBar("Ingrese todos los datos", "Ok");
      }
    }
    else if (!this.signedIn) {
      this.openSnackBar("Por favor inicie sesión en su cuenta de Google", "Ok");
    }
    else{

      this.age = (document.getElementById('age') as HTMLInputElement).value;
      this.city = (document.getElementById('city') as HTMLInputElement).value;
      this.country = (document.getElementById('country') as HTMLInputElement).value;
      this.address = (document.getElementById('address') as HTMLInputElement).value;

      this.post(this.name, this.age, this.city, this.country, this.address, this.email, this.gender, '', this.email)
    }
  }

  post(name, age, city, country, address, email, gender, password, username){
    const req = this.http.post(`${API_URL}/add_user`, {
      nombre: name,
      edad: age,
      ciudad: city,
      pais: country,
      direccion: address,
      correo: email,
      genero: gender,
      contrasena: password,
      usuario: username
    })
    .subscribe(
      res => {
        if (res == "Usuario agregado exitosamente") {
          this.openSnackBar("Usuario creado exitosamente", "OK");

          window.open('/home', '_self', '', false);
        }
        else{
          this.openSnackBar("Ya existe un usuario asociado a esta cuenta de Google", "Ok");
        }
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
