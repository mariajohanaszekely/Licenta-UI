import { Component, OnInit, TemplateRef } from '@angular/core';
import { TempSensorService } from './temp-sensor.service';
import { TempSensorModel } from './temp-sensor.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-temp-sensor',
  templateUrl: './temp-sensor.component.html',
  styleUrls: ['./temp-sensor.component.css'],
})
export class TempSensorComponent implements OnInit {
  constructor(
    private tempSensorService: TempSensorService,
    private dialog: MatDialog
  ) {}

  public tempSensorLastValue: string;

  public ngOnInit(): void {
    this.getDataFromTempSensor();
  }

  public getDataFromTempSensor(): void {
    this.tempSensorService.getTempSensorData().subscribe((sensorData) => {
      let sensorValues: string[] = [];

      sensorData.feeds.forEach((feed: TempSensorModel) => {
        sensorValues.push(feed.field1);
      });
      this.tempSensorLastValue = sensorValues[sensorValues.length - 1];
    });
  }

  public openGraphDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: 'auto',
      height: '350px',
    });
  }
}
