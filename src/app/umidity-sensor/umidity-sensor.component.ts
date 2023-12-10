import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-umidity-sensor',
  templateUrl: './umidity-sensor.component.html',
  styleUrls: ['./umidity-sensor.component.css']
})
export class UmiditySensorComponent {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDataFromSensor();
  }

  public senzorData;

  public getDataFromSensor() {
    this.http.get('https://thingspeak.com/channels/2354728/field/2.json').subscribe((data: any) => {
      this.senzorData = data.feeds;
    });
  }
}
