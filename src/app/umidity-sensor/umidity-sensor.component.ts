import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { HumiditySensorService } from './umidity-sensor.service';
import { HumiditySensorModel } from './umidity-sensor.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-umidity-sensor',
  templateUrl: './umidity-sensor.component.html',
  styleUrls: ['./umidity-sensor.component.css'],
})
export class HumiditySensorComponent implements OnInit {
  constructor(
    private humiditySensorService: HumiditySensorService,
    private dialog: MatDialog
  ) {}

  public humiditySensorLastValue: string;

  ngOnInit(): void {
    this.getDataFromHumiditySensor();
  }

  public getDataFromHumiditySensor(): void {
    this.humiditySensorService
      .getHumiditySensorData()
      .subscribe((sensorData) => {
        let sensorValues: string[] = [];

        sensorData.feeds.forEach((feed: HumiditySensorModel) => {
          sensorValues.push(feed.field2);
        });
        this.humiditySensorLastValue = sensorValues[sensorValues.length - 1];
      });
  }

  public openGraphDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: 'auto',
      height: '350px',
    });
  }
}
