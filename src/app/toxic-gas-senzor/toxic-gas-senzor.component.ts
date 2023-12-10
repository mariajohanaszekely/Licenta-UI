import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToxicGasSensorService } from './toxic-gas-senzor.service';
import { ToxicGasSensorModel } from './toxic-gas-senzor.model';

@Component({
  selector: 'app-toxic-gas-senzor',
  templateUrl: './toxic-gas-senzor.component.html',
  styleUrls: ['./toxic-gas-senzor.component.css']
})
export class ToxicGasSenzorComponent implements OnInit {
  constructor(private toxicGasSensorService: ToxicGasSensorService) { }

  public sensorLastValue: string;

  ngOnInit(): void {
    this.getToxicGasSensorData();
  }

  public getToxicGasSensorData() {
    this.toxicGasSensorService
      .getToxicGasSensorData()
      .subscribe((data) => {
        let sensorValues: string[] = [];

        data.feeds.forEach((feed: ToxicGasSensorModel) => {
          sensorValues.push(feed.field6);
        });
        this.sensorLastValue =
          sensorValues[sensorValues.length - 1];
      });
  }
}


