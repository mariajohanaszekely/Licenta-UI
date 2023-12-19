import { Component, OnInit } from '@angular/core';
import { LevelSensorService } from './level-senzor.service';
import { LevelSensorModel } from './level-senzor.model';

@Component({
  selector: 'app-level-senzor',
  templateUrl: './level-senzor.component.html',
  styleUrls: ['./level-senzor.component.css'],
})
export class LevelSensorComponent implements OnInit {
  constructor(private levelSensorService: LevelSensorService) {}

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
}
