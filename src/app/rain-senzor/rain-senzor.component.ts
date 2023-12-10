import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RainSenzorService } from './rain-senzor.service';
import { RainSenzorModel } from './rain-senzor.model';

@Component({
  selector: 'app-rain-senzor',
  templateUrl: './rain-senzor.component.html',
  styleUrls: ['./rain-senzor.component.css']
})
export class RainSenzorComponent implements OnInit {
  constructor(private rainSenzorService: RainSenzorService) { }

  public levelSenzorLastValue: string;

  ngOnInit(): void {
    this.getDataFromRainSensor();
  }

  public getDataFromRainSensor() {
    this.rainSenzorService
      .getRainSenzorData()
      .subscribe((senzorData) => {
        let levelSenzorValues: string[] = [];

        senzorData.feeds.forEach((feed: RainSenzorModel) => {
          levelSenzorValues.push(feed.field4);
        });
        this.levelSenzorLastValue =
          levelSenzorValues[levelSenzorValues.length - 1];
      });
  }
}
