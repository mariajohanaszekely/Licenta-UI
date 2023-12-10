import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-toxic-gas-senzor',
  templateUrl: './toxic-gas-senzor.component.html',
  styleUrls: ['./toxic-gas-senzor.component.css']
})
export class ToxicGasSenzorComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDataFromSensor();
  }

  public senzorData;

  public getDataFromSensor() {
    this.http.get('https://thingspeak.com/channels/2354728/field/6.json').subscribe((data: any) => {
      this.senzorData = data.feeds;
    });
  }
}
