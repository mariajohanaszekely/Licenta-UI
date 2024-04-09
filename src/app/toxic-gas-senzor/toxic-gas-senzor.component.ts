import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToxicGasSensorService } from './toxic-gas-senzor.service';
import { ToxicGasSensorModel } from './toxic-gas-senzor.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-toxic-gas-senzor',
  templateUrl: './toxic-gas-senzor.component.html',
  styleUrls: ['./toxic-gas-senzor.component.css'],
})
export class ToxicGasSensorComponent implements OnInit {
  constructor(
    private toxicGasSensorService: ToxicGasSensorService,
    private dialog: MatDialog
  ) { }

  public toxicGasSensorLastValue: string;

  ngOnInit(): void {
    this.getToxicGasSensorData();
  }

  public getToxicGasSensorData(): void {
    this.toxicGasSensorService
      .getToxicGasSensorData()
      .subscribe((sensorData) => {
        let toxicGasSensorValues: string[] = [];

        sensorData.feeds.forEach((feed: ToxicGasSensorModel) => {
          toxicGasSensorValues.push(feed.field6);
        });
        this.toxicGasSensorLastValue = toxicGasSensorValues[toxicGasSensorValues.length - 1];
      })
  }

  public openGraphDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: 'auto',
      height: '350px',
    });
  }
}
