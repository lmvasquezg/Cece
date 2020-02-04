import { Component, OnInit, TemplateRef, Inject, Input } from '@angular/core';
import {API_URL} from '../env'
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as CanvasJS from '../canvasjs.min.js';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

 constructor(private http: HttpClient, private _snackBar: MatSnackBar, private route:ActivatedRoute) {
 }
  
  input:data[]=[{user:"Luisa",temp:32.6,hum:65,loc:"Medellin"},{user:"Pachon",temp:32.6,hum:95,loc:"Medellin"},{user:"Profe",temp:36.6,hum:45,loc:"Miami"},
  {user:"Isabela",temp:37.6,hum:45,loc:"San Diego"},{user:"Lalinde",temp:92.6,hum:45,loc:"Bogota"},{user:"Michel",temp:2.6,hum:50,loc:"Medellin"}];


  ngOnInit() {
    let dataPoints=[]

    this.renderUsers()

    //Organizar datos de ciudades en dataPoints para graficod de ciudades
    dataPoints=[]
    for(let entry of this.input){
      if (!dataPoints.find(x=>x.name==entry.loc)){
        dataPoints.push({y:1,name:entry.loc})
      }else{
        let index = dataPoints.findIndex(x=>x.name==entry.loc)
        dataPoints[index].y= Number(dataPoints[index].y)+1
      }
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

renderUsers(){
  let dataPoints=[]
  //Organizar datos de usuarios en dataPoints para el grafico
  for(let entry of this.input){
    if (!dataPoints.find(x=>x.name==entry.user)){
      dataPoints.push({y:1,name:entry.user})
    }else{
      let index = dataPoints.findIndex(x=>x.name==entry.user)
      dataPoints[index].y= Number(dataPoints[index].y)+1

    }
  }
  
  let chart = new CanvasJS.Chart("chartContainer", {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title:{
      text: "Entradas por usuario"
    },
    data: [{
      type: "pie",
      showInLegend: true,
      toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
      indexLabel: "{name} - #percent%",
      dataPoints: dataPoints
    }]
  });
    
  chart.render(); 
}






}

interface data {
  user?: string
  temp?: number
  hum?: number
  loc?:string
  
}




