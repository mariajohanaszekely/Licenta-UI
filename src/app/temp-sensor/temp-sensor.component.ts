import { Component, OnInit } from '@angular/core';
import { TempSensorService } from './temp-sensor.service';
import { TempSensorModel } from './temp-sensor.model';

@Component({
  selector: 'app-temp-sensor',
  templateUrl: './temp-sensor.component.html',
  styleUrls: ['./temp-sensor.component.css']
})
export class TempSensorComponent implements OnInit {
  constructor(private tempSensorService: TempSensorService) { }

  public sensorLastValue: string;

  ngOnInit(): void {
    this.getDataFromSwitch();
  }

  public getDataFromSwitch() {
    this.tempSensorService
      .getTempSensorData()
      .subscribe((data) => {
        let sensorValues: string[] = [];

        data.feeds.forEach((feed: TempSensorModel) => {
          sensorValues.push(feed.field1);
        });
        this.sensorLastValue =
          sensorValues[sensorValues.length - 1];
      });
  }
}
