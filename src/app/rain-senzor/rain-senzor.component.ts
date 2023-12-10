import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rain-senzor',
  templateUrl: './rain-senzor.component.html',
  styleUrls: ['./rain-senzor.component.css']
})
export class RainSenzorComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDataFromSensor();
  }

  public senzorData;

  public getDataFromSensor() {
    this.http.get('https://thingspeak.com/channels/2354728/field/4.json').subscribe((data: any) => {
      this.senzorData = data.feeds;
    });
  }
}
