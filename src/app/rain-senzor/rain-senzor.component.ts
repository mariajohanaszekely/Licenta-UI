import { Component, OnInit, TemplateRef } from '@angular/core';
import { RainSensorService } from './rain-senzor.service';
import { RainSensorModel } from './rain-senzor.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-rain-senzor',
  templateUrl: './rain-senzor.component.html',
  styleUrls: ['./rain-senzor.component.css'],
})
export class RainSensorComponent implements OnInit {
  constructor(
    private rainSensorService: RainSensorService,
    private dialog: MatDialog
  ) {}

  public rainSensorLastValue: string;

  ngOnInit(): void {
    this.getDataFromRainSensor();
  }

  public getDataFromRainSensor(): void {
    this.rainSensorService.getRainSensorData().subscribe((sensorData) => {
      let levelSensorValues: string[] = [];

      sensorData.feeds.forEach((feed: RainSensorModel) => {
        levelSensorValues.push(feed.field4);
      });
      this.rainSensorLastValue =
        levelSensorValues[levelSensorValues.length - 1];
    });
  }

  public openGraphDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
}
