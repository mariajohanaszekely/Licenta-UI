import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SwitchService } from './switch.service';
import { SwitchModel } from './switch.model';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {
  constructor(private switchService: SwitchService) { }

  public switchLastValue: string;

  ngOnInit(): void {
    this.getDataFromSwitch();
  }

  public getDataFromSwitch() {
    this.switchService
      .getSwitchData()
      .subscribe((data) => {
        let switchValues: string[] = [];

        data.feeds.forEach((feed: SwitchModel) => {
          switchValues.push(feed.field5);
        });
        this.switchLastValue =
        switchValues[switchValues.length - 1];
      });
  }
}
