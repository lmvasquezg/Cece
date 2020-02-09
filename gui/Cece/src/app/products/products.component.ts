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
 public results: Object;
  
  input:data[]=[]

  ngOnInit() {
    this.getData()
  }

async getData() {
   await this.http.get(`${API_URL}/getinfo`).subscribe(data => {
    this.results = data;
    let n = data
    for(let n of data){
    let val :data = {user:n['user'],temp:n['temp'],hum:n['hum'],loc:n['city'],date:new Date(n['date'])}
    this.input.push(val)
  }
    
    this.renderUsers()
    this.renderLineChart()
    this.renderLocation()
  })

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
  
  let chart = new CanvasJS.Chart("chartUsers", {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title:{
      text: "Datos por usuario"
    },
    data: [{
      type: "pie",
      showInLegend: false,
      toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
      indexLabel: "{name} - #percent%",
      dataPoints: dataPoints
    }]
  });
    
  chart.render(); 
}

renderLocation(){
  let dataPoints=[]
  //Organizar datos de usuarios en dataPoints para el grafico
  for(let entry of this.input){
    if (!dataPoints.find(x=>x.name==entry.loc)){
      dataPoints.push({y:1,name:entry.loc})
    }else{
      let index = dataPoints.findIndex(x=>x.name==entry.loc)
      dataPoints[index].y= Number(dataPoints[index].y)+1

    }
  }
  
  let chart = new CanvasJS.Chart("chartLocation", {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title:{
      text: "Datos por ciudad"
    },
    data: [{
      type: "pie",
      showInLegend: false,
      toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
      indexLabel: "{name} - #percent%",
      dataPoints: dataPoints
    }]
  });
    
  chart.render(); 
}

renderLineChart(){

  let dataTemp=[]
  let dataHum=[]

  for(let entry of this.input){
    dataTemp.push({y:entry.temp,x:entry.date})
    dataHum.push({y:entry.hum,x:entry.date})
  }
   dataTemp = dataTemp.sort((a, b) => b.x - a.x)
   dataHum = dataHum.sort((a, b) => b.x - a.x)

  var chart = new CanvasJS.Chart("chartData", {
    animationEnabled: true,
    theme: "light2",
    title:{
      text: "Promedio de tempertura y humedad"
    },
    axisX:{
      valueFormatString: "DD MMM",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY: {
      title: "% / C",
      crosshair: {
        enabled: true
      }
    },
    toolTip:{
      shared:true
    },  
    legend:{
      cursor:"pointer",
      verticalAlign: "bottom",
      horizontalAlign: "left",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries
    },
    data: [{
      type: "line",
      showInLegend: true,
      name: "Temperatura",
      markerType: "square",
      xValueFormatString: "DD MMM, YYYY",
      color: "#F08080",
      dataPoints: dataTemp
    },    {
      type: "line",
      showInLegend: true,
      name: "Humedad",      lineDashType: "dash",
      dataPoints: dataHum
    }]
  });
  chart.render();
  
  function toogleDataSeries(e){
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else{
      e.dataSeries.visible = true;
    }
    chart.render();
  }
}


}

interface data {
  user?: string
  temp?: number
  hum?: number
  loc?:string
  date?:Date
  
}




