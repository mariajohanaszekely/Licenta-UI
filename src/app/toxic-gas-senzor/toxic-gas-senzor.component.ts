import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToxicGasSensorService } from './toxic-gas-senzor.service';
import { ToxicGasSensorModel } from './toxic-gas-senzor.model';

@Component({
  selector: 'app-toxic-gas-senzor',
  templateUrl: './toxic-gas-senzor.component.html',
  styleUrls: ['./toxic-gas-senzor.component.css'],
})
export class ToxicGasSensorComponent implements OnInit {
  constructor(private toxicGasSensorService: ToxicGasSensorService) {}

  public toxicGasSensorLastValue: string;

  ngOnInit(): void {
    this.getToxicGasSensorData();
  }

  public getToxicGasSensorData(): void {
    this.toxicGasSensorService
      .getToxicGasSensorData()
      .subscribe((sensorData) => {
        let sensorValues: string[] = [];

        sensorData.feeds.forEach((feed: ToxicGasSensorModel) => {
          sensorValues.push(feed.field6);
        });
        this.toxicGasSensorLastValue = sensorValues[sensorValues.length - 1];
      });
  }
}
