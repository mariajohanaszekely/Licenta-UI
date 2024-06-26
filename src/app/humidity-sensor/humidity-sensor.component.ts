import { Component, OnInit, TemplateRef } from '@angular/core';
import { HumiditySensorService } from './humidity-sensor.service';
import { HumiditySensorModel } from './humidity-sensor.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-umidity-sensor',
  templateUrl: './humidity-sensor.component.html',
  styleUrls: ['./humidity-sensor.component.css'],
})
export class HumiditySensorComponent implements OnInit {
  constructor(
    private humiditySensorService: HumiditySensorService,
    private dialog: MatDialog
  ) { }

  public humiditySensorLastValue: string;

  ngOnInit(): void {
    this.getDataFromHumiditySensor();
  }

  public getDataFromHumiditySensor(): void {
    this.humiditySensorService
      .getHumiditySensorData()
      .subscribe((sensorData) => {
        let humiditySensorValues: string[] = [];

        sensorData.feeds.forEach((feed: HumiditySensorModel) => {
          humiditySensorValues.push(feed.field2);
        });
        this.humiditySensorLastValue =
            humiditySensorValues[humiditySensorValues.length - 1];
      });
  }

  public openGraphDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: 'auto',
      height: '350px',
    });
  }
}
