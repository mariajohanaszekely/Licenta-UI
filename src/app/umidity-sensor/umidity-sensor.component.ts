import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UmiditySensorService } from './umidity-sensor.service';
import { UmiditySensorModel } from './umidity-sensor.model';

@Component({
  selector: 'app-umidity-sensor',
  templateUrl: './umidity-sensor.component.html',
  styleUrls: ['./umidity-sensor.component.css']
})
export class UmiditySensorComponent implements OnInit {
  constructor(private umiditySensorService: UmiditySensorService) { }

  public sensorLastValue: string;

  ngOnInit(): void {
    this.getDataFromSwitch();
  }

  public getDataFromSwitch() {
    this.umiditySensorService
      .getUmiditySensorData()
      .subscribe((data) => {
        let sensorValues: string[] = [];

        data.feeds.forEach((feed: UmiditySensorModel) => {
          sensorValues.push(feed.field2);
        });
        this.sensorLastValue =
          sensorValues[sensorValues.length - 1];
      });
  }
}

