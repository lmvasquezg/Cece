import { Component, OnInit } from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';

import { API_URL } from '../env';
import { USER } from '../user';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  genderOptions = [
    'Hombre',
    'Mujer',
    'Otro'
  ];

  name_control = new FormControl('', [Validators.required]);
  age_control = new FormControl('', [Validators.required, Validators.min(1)]);
  city_control = new FormControl('', [Validators.required]);
  country_control = new FormControl('', [Validators.required]);
  address_control = new FormControl('', [Validators.required]);
  email_control = new FormControl('', [Validators.required, Validators.email]);
  gender_control = new FormControl('', [Validators.required]);
  user_control = new FormControl('', [Validators.required]);
  psw_control = new FormControl('', [Validators.required]);

  name;
  age;
  city;
  country;
  address;
  email;
  gender;
  username;
  password;

  getErrorMessage(type: string) {
    switch(type) {
      case "name":
        return this.name_control.hasError('required') ? 'Por favor ingrese su nombre' : '';
        break;
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
      case "email":
        return this.email_control.hasError('required') ? 'Por favor ingrese su correo electrónico' :
               this.email_control.hasError('email') ? 'Por favor ingrese un correo electrónico valido' : 
               '';
        break;
      case "gender":
        return this.gender_control.hasError('required') ? 'Por favor seleccione una opción' : '';
        break;
      case "user":
        return this.user_control.hasError('required') ? 'Por favor seleccione un nombre de usuario' : '';
        break;
      case "password":
        return this.psw_control.hasError('required') ? 'Por favor ingrese una contraseña' : '';
        break;
    }
  }

  createUser() {
    if (this.name_control.invalid || this.age_control.invalid || this.city_control.invalid || this.country_control.invalid || this.address_control.invalid || this.email_control.invalid || this.gender_control.invalid || this.user_control.invalid || this.psw_control.invalid) {
      if (this.age_control.hasError('min')) {
        this.openSnackBar("Ingrese una edad valida", "Ok");
      }
      else if (this.email_control.hasError('email')) {
        this.openSnackBar("Ingrese un correo electrónico valido", "Ok")
      }
      else{
        this.openSnackBar("Ingrese todos los datos", "Ok");
      }
    }
    else{
      this.name = (document.getElementById('name') as HTMLInputElement).value;
      this.age = (document.getElementById('age') as HTMLInputElement).value;
      this.city = (document.getElementById('city') as HTMLInputElement).value;
      this.country = (document.getElementById('country') as HTMLInputElement).value;
      this.address = (document.getElementById('address') as HTMLInputElement).value;
      this.email = (document.getElementById('email')as HTMLInputElement).value;
      this.username = (document.getElementById('username') as HTMLInputElement).value;
      this.password = (document.getElementById('password') as HTMLInputElement).value;
  
      // USER.name = this.name;
      // USER.age = this.age;
      // USER.city = this.city;
      // USER.country = this.country;
      // USER.address = this.address;
      // USER.email = this.email;
      // USER.gender = this.gender;
      // USER.username = this.username;
      // USER.password = this.password;
      
      this.post(this.name, this.age, this.city, this.country, this.address, this.email, this.gender, this.password, this.username);
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
          this.openSnackBar("El nombre de usuario ya existe", "Ok");
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
