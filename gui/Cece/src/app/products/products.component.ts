import { Component, OnInit, TemplateRef, Inject, Input } from '@angular/core';
import {API_URL} from '../env'
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as CanvasJS from './canvasjs.min';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  


 constructor(private http: HttpClient, private _snackBar: MatSnackBar, private route:ActivatedRoute) {
 }
  ngOnInit() {
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Monthly Expense"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: 450, name: "Food" },
          { y: 120, name: "Insurance" },
          { y: 300, name: "Traveling" },
          { y: 800, name: "Housing" },
          { y: 150, name: "Education" },
          { y: 150, name: "Shopping"},
          { y: 250, name: "Others" }
        ]
      }]
    });
      
    chart.render();
    
  
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






}

interface mix {
  cl?: string
  url?: string
}


