import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { SwitchService } from './switch.service';
import { SwitchModel } from './switch.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
})
export class SwitchComponent implements OnInit {
  constructor(
    private switchService: SwitchService,
    private dialog: MatDialog
  ) { }

  public switchLastValue: string;

  ngOnInit(): void {
    this.getDataFromSwitch();
  }

  public getDataFromSwitch(): void {
    this.switchService.getSwitchData().subscribe((sensorData) => {
      let switchValues: string[] = [];

      sensorData.feeds.forEach((feed: SwitchModel) => {
        switchValues.push(feed.field5);
      });
      this.switchLastValue = switchValues[switchValues.length - 1];

    });
  }

  public openGraphDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: 'auto',
      height: '350px',
    });
  }
}
