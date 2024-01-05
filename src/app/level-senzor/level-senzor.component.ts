import { Component, OnInit, TemplateRef } from '@angular/core';
import { LevelSensorService } from './level-senzor.service';
import { LevelSensorModel } from './level-senzor.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-level-senzor',
  templateUrl: './level-senzor.component.html',
  styleUrls: ['./level-senzor.component.css'],
})
export class LevelSensorComponent implements OnInit {
  constructor(
    private levelSensorService: LevelSensorService,
    private dialog: MatDialog
  ) {}

  public levelSensorLastValue: string;

  ngOnInit(): void {
    this.getDataFromLevelSensor();
  }

  public getDataFromLevelSensor(): void {
    this.levelSensorService.getLevelSensorData().subscribe((sensorData) => {
      let levelSensorValues: string[] = [];

      sensorData.feeds.forEach((feed: LevelSensorModel) => {
        levelSensorValues.push(feed.field3);
      });
      this.levelSensorLastValue =
        levelSensorValues[levelSensorValues.length - 1];
    });
  }

  public openGraphDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
}
