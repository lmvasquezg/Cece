import { Component, OnInit, TemplateRef, Inject, Input } from '@angular/core';
import {API_URL} from '../env'
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  images:mix[] =[ {cl:'card',url:"../../assets/pictures/1.jpg"},{cl:'card',url:"../../assets/pictures/2.jpg"},
  {cl:'card',url:"../../assets/pictures/3.jpg"},{cl:'card',url:"../../assets/pictures/4.jpg"},{cl:'card',url:"../../assets/pictures/5.jpg"},
  {cl:'card',url:"../../assets/pictures/6.jpg"},{cl:'card',url:"../../assets/pictures/7.jpg"},{cl:'card',url:"../../assets/pictures/8.jpg"},
  {cl:'card',url:"../../assets/pictures/9.jpg"},{cl:'card',url:"../../assets/pictures/10.jpg"},{cl:'card',url:"../../assets/pictures/11.jpg"},
  {cl:'card',url:"../../assets/pictures/12.jpg"},{cl:'card',url:"../../assets/pictures/13.jpg"},{cl:'card',url:"../../assets/pictures/14.jpg"},
  {cl:'card',url:"../../assets/pictures/15.png"},{cl:'card',url:"../../assets/pictures/16.jpg"},{cl:'card',url:"../../assets/pictures/17.jpg"},
  {cl:'card',url:"../../assets/pictures/18.jpg"},{cl:'card',url:"../../assets/pictures/19.jpg"},{cl:'card',url:"../../assets/pictures/20.jpg"},
  {cl:'card',url:"../../assets/pictures/21.jpg"},{cl:'card',url:"../../assets/pictures/22.jpg"},{cl:'card',url:"../../assets/pictures/23.jpg"},
  {cl:'card',url:"../../assets/pictures/24.jpg"},{cl:'card',url:"../../assets/pictures/25.jpg"},{cl:'card',url:"../../assets/pictures/26.jpg"},
  {cl:'card',url:"../../assets/pictures/27.jpg"},{cl:'card',url:"../../assets/pictures/28.jpg"},{cl:'card',url:"../../assets/pictures/29.jpg"},
  {cl:'card',url:"../../assets/pictures/30.jpg"},{cl:'card',url:"../../assets/pictures/31.jpg"},{cl:'card',url:"../../assets/pictures/32.jpg"},
  {cl:'card',url:"../../assets/pictures/33.jpg"},{cl:'card',url:"../../assets/pictures/34.jpg"},{cl:'card',url:"../../assets/pictures/35.jpg"},
 {cl:'card',url:"../../assets/pictures/36.jpg"}, {cl:'card',url:"../../assets/pictures/37.png"},{cl:'card',url:"../../assets/pictures/38.jpg"},
  {cl:'card',url:"../../assets/pictures/39.jpg"},{cl:'card',url:"../../assets/pictures/40.jpg"},{cl:'card',url:"../../assets/pictures/41.jpg"},
  {cl:'card',url:"../../assets/pictures/42.jpg"},{cl:'card',url:"../../assets/pictures/43.jpg"},{cl:'card',url:"../../assets/pictures/44.jpg"},
  {cl:'card',url:"../../assets/pictures/45.jpg"},{cl:'card',url:"../../assets/pictures/46.jpg"},{cl:'card',url:"../../assets/pictures/47.jpg"},
  {cl:'card',url:"../../assets/pictures/48.jpg"},{cl:'card',url:"../../assets/pictures/49.jpg"},{cl:'card',url:"../../assets/pictures/50.jpg"},
  {cl:'card',url:"../../assets/pictures/51.jpg"}]

  selected:mix[]
  color:string
  message:string
  cardstyle:string
  show:boolean
  defaultValue: string = '';
 message1:string
  
  comentario:string
  animales:Array<number>


 constructor(private http: HttpClient, private _snackBar: MatSnackBar, private route:ActivatedRoute) {
 }
  ngOnInit() {
    this.selected=new Array<mix>()
    this.color='primary'
    this.message1='Enviar'
    this.show=false
    this.animales = new Array();
    
    this.message = this.route.snapshot.params.id;
  
  }

  submit(index) {
    if(this.images[index].cl =='card'){
      this.images[index].cl='selected'
      this.selected.push(this.images[index])
      this.animales.push(index+1)
    }else{
      this.images[index].cl='card'
      let i =this.selected.findIndex(x=>x.url===this.images[index].url)
      this.selected.splice(i,1)
      let j =this.selected.findIndex(x=>x===index+1)
      this.animales.splice(j,1)
    }
  }

async btnClick(){
  if (this.animales.length != 0) {
    if (this.message1 != '¡Enviado!') {
      this.comentario = (document.getElementById('datos') as HTMLInputElement).value;
      await this.post(this.comentario,this.animales)
      this.color='greenyellow'
      this.message1='¡Enviado!'
      this.show=true
    }
  }
  else {
    this.openSnackBar("Por favor seleccione los animales a los que desea agregar el comentario", "Ok");
  }
 }

 post(comentario, animales: Array<Number>){
  
  const req = this.http.post(`${API_URL}/add_comment`, {
    //usuario: this.message,
    product: [JSON.stringify(animales)],
    comment : comentario
    
  })
  .subscribe(
    res => {
      if (res == "Comentario agregado exitosamente") {
        this.openSnackBar("Comentario agregado exitosamente", "OK");
        
      }
      else{
        this.openSnackBar("No se ha podido agregar el comentario", "Ok");
      }
    }
  )
}

openSnackBar(mensaje: string, action: string) {
  this._snackBar.open(mensaje, action, {
    duration: 2000,
  });
}



 btnAdd(){
  this.color='primary'
  this.message1='Enviar'
  this.show=false
  this.defaultValue=''
  this.animales = new Array();
  for(let i =0;i<51;i++){
    this.images[i].cl='card'
  }
}


}

interface mix {
  cl?: string
  url?: string
}


