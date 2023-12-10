import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-temp-sensor',
  templateUrl: './temp-sensor.component.html',
  styleUrls: ['./temp-sensor.component.css']
})
export class TempSensorComponent {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDataFromSensor();
  }

  public senzorData;

  public getDataFromSensor() {
    this.http.get('https://thingspeak.com/channels/2354728/field/1.json').subscribe((data: any) => {
      this.senzorData = data.feeds;
    });
  }
}
