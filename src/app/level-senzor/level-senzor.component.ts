import { Component, OnInit } from '@angular/core';
import { LevelSenzorService } from './level-senzor.service';
import { LevelSenzorModel } from './level-senzor.model';

@Component({
  selector: 'app-level-senzor',
  templateUrl: './level-senzor.component.html',
  styleUrls: ['./level-senzor.component.css']
})
export class LevelSenzorComponent implements OnInit {
  constructor(private levelSenzorService: LevelSenzorService) { }

  public levelSenzorLastValue: string;

  ngOnInit(): void {
    this.getDataFromLevelSensor();
  }

  public getDataFromLevelSensor() {
    this.levelSenzorService
      .getLevelSenzorData()
      .subscribe((senzorData) => {
        let levelSenzorValues: string[] = [];

        senzorData.feeds.forEach((feed: LevelSenzorModel) => {
          levelSenzorValues.push(feed.field3);
        });
        this.levelSenzorLastValue =
          levelSenzorValues[levelSenzorValues.length - 1];
      });
  }
}