import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccelerationSensorService } from './acceleration-sensor.service';
import { MatDialog } from '@angular/material/dialog';
import { AccelerationSensorModel } from './acceleration-sensor.model';

@Component({
  selector: 'app-acceleration-sensor',
  templateUrl: './acceleration-sensor.component.html',
  styleUrls: ['./acceleration-sensor.component.css'],
})
export class AccelerationSensorComponent implements OnInit {
  constructor(
    private accelerationSensorService: AccelerationSensorService,
    private dialog: MatDialog
  ) {}

  public accelerationSensorLastValue: string;

  ngOnInit(): void {
    this.getDataFromaccelerationSensor();
  }

  public getDataFromaccelerationSensor(): void {
    this.accelerationSensorService
      .getAccelerationSensorData()
      .subscribe((sensorData) => {
        let accelerationSensorValues: string[] = [];

        sensorData.feeds.forEach((feed: AccelerationSensorModel) => {
          accelerationSensorValues.push(feed.field7);
        });
        this.accelerationSensorLastValue =
          accelerationSensorValues[accelerationSensorValues.length - 1];
      });
  }

  public openGraphDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: 'auto',
      height: '350px',
    });
  }
}
