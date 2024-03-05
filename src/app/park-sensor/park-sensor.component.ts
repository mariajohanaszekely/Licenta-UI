import { Component, OnInit, TemplateRef } from '@angular/core';
import { ParkSensorService as ParkSensorService } from './park-sensor.service';
import { MatDialog } from '@angular/material/dialog';
import { ParkSensorModel } from './park-sensor.model';

@Component({
  selector: 'app-park-sensor',
  templateUrl: './park-sensor.component.html',
  styleUrls: ['./park-sensor.component.css'],
})
export class ParkSensorComponent implements OnInit {
  constructor(
    private parkSensorService: ParkSensorService,
    private dialog: MatDialog
  ) {}

  public parkSensorLastValue: string;

  ngOnInit(): void {
    this.getDataFromParkSensor();
  }

  public getDataFromParkSensor(): void {
    this.parkSensorService.getParkSensorData().subscribe((sensorData) => {
      let parkSensorValues: string[] = [];

      sensorData.feeds.forEach((feed: ParkSensorModel) => {
        parkSensorValues.push(feed.field8);
      });
      this.parkSensorLastValue = '0'
    });
  }

  public openGraphDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: 'auto',
      height: '350px',
    });
  }
}
