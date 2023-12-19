import { Component, OnInit } from '@angular/core';
import { LevelSensorService } from './level-senzor/level-senzor.service';
import { RainSensorService as RainSensorService } from './rain-senzor/rain-senzor.service';
import { SwitchService } from './switch/switch.service';
import { TempSensorService } from './temp-sensor/temp-sensor.service';
import { ToxicGasSensorService } from './toxic-gas-senzor/toxic-gas-senzor.service';
import { HumiditySensorService as HumiditySensorService } from './umidity-sensor/umidity-sensor.service';
import { LevelSensorModel } from './level-senzor/level-senzor.model';
import { RainSensorModel as RainSensorModel } from './rain-senzor/rain-senzor.model';
import { SwitchModel } from './switch/switch.model';
import { TempSensorModel } from './temp-sensor/temp-sensor.model';
import { ToxicGasSensorModel } from './toxic-gas-senzor/toxic-gas-senzor.model';
import { HumiditySensorModel } from './umidity-sensor/umidity-sensor.model';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public lastUpdate: Date;

  constructor(
    private levelSensorService: LevelSensorService,
    private rainSensorService: RainSensorService,
    private switchService: SwitchService,
    private tempSensorService: TempSensorService,
    private toxicGasSensorService: ToxicGasSensorService,
    private humiditySensorService: HumiditySensorService
  ) {}

  ngOnInit(): void {
    this.getLastUpdateDateFromSensors();

    this.getDataFromLevelSensor();
    this.getDataFromRainSensor();
    this.getDataFromSwitch();
    this.getDataFromTempSensor();
    this.getToxicGasSensorData();
    this.getDataFromHumiditySensor();
  }

  public refreshData(): void {
    window.location.reload();
  }

  public getLastUpdateDateFromSensors(): void {
    this.levelSensorService.getLevelSensorData().subscribe((sensorData) => {
      this.lastUpdate =
        sensorData.feeds[sensorData.feeds.length - 1].created_at;
    });
  }

  public ExportSensorsDataToExcel(): void {
    let fuelRangeLevel = '';
    if (+this.levelSensorLastValue < 50) {
      fuelRangeLevel = 'Low';
    }
    if (+this.levelSensorLastValue >= 50 && +this.levelSensorLastValue <= 500) {
      fuelRangeLevel = 'Moderate';
    }
    if (+this.levelSensorLastValue >= 500) {
      fuelRangeLevel = 'Full';
    }

    let wipersMovement = '';
    if (+this.rainSensorLastValue > 4000) {
      wipersMovement = 'OFF';
    }
    if (
      +this.rainSensorLastValue <= 4000 &&
      +this.rainSensorLastValue >= 3000
    ) {
      wipersMovement = 'Low';
    }
    if (
      +this.rainSensorLastValue <= 3000 &&
      +this.rainSensorLastValue >= 2000
    ) {
      wipersMovement = 'Moderate';
    }
    if (
      +this.rainSensorLastValue <= 2000 &&
      +this.rainSensorLastValue >= 1000
    ) {
      wipersMovement = 'High';
    }
    if (+this.rainSensorLastValue <= 1000) {
      wipersMovement = 'Very high';
    }

    const data = [
      ['Fuel range is', fuelRangeLevel],
      ['Wipers movement', wipersMovement],
      ['The door is', this.switchLastValue === '0' ? 'closed' : 'opened'],
      ['Temperature in car [°C] :', this.tempSensorLastValue],
      [
        'Toxic gases in car :',
        +this.toxicGasSensorLastValue > 0
          ? 'There are toxic gases in the car'
          : 'There are no toxic gases in the car',
      ],
      ['Humidity in car [%RH] :', this.humiditySensorLastValue],
    ];

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SensorsData');
    XLSX.writeFile(wb, 'sensors_data.xlsx');
  }

  public levelSensorLastValue: string;
  public rainSensorLastValue: string;
  public switchLastValue: string;
  public tempSensorLastValue: string;
  public toxicGasSensorLastValue: string;
  public humiditySensorLastValue: string;

  public getDataFromLevelSensor() {
    this.levelSensorService.getLevelSensorData().subscribe((sensorData) => {
      let levelSensorValues: string[] = [];

      sensorData.feeds.forEach((feed: LevelSensorModel) => {
        levelSensorValues.push(feed.field3);
      });
      this.levelSensorLastValue =
        levelSensorValues[levelSensorValues.length - 1];
    });
  }

  public getDataFromRainSensor(): void {
    this.rainSensorService.getRainSensorData().subscribe((sensorData) => {
      let rainSensorValues: string[] = [];

      sensorData.feeds.forEach((feed: RainSensorModel) => {
        rainSensorValues.push(feed.field4);
      });
      this.rainSensorLastValue = rainSensorValues[rainSensorValues.length - 1];
    });
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

  public getDataFromTempSensor(): void {
    this.tempSensorService.getTempSensorData().subscribe((sensorData) => {
      let tempSensorValues: string[] = [];

      sensorData.feeds.forEach((feed: TempSensorModel) => {
        tempSensorValues.push(feed.field1);
      });
      this.tempSensorLastValue = tempSensorValues[tempSensorValues.length - 1];
    });
  }

  public getToxicGasSensorData(): void {
    this.toxicGasSensorService
      .getToxicGasSensorData()
      .subscribe((sensorData) => {
        let toxicGasSensorValues: string[] = [];

        sensorData.feeds.forEach((feed: ToxicGasSensorModel) => {
          toxicGasSensorValues.push(feed.field6);
        });
        this.toxicGasSensorLastValue =
          toxicGasSensorValues[toxicGasSensorValues.length - 1];
      });
  }

  public getDataFromHumiditySensor(): void {
    this.humiditySensorService
      .getHumiditySensorData()
      .subscribe((sensorData) => {
        let humiditySensorValues: string[] = [];

        sensorData.feeds.forEach((feed: HumiditySensorModel) => {
          humiditySensorValues.push(feed.field2);
        });
        this.humiditySensorLastValue =
          humiditySensorValues[humiditySensorValues.length - 1];
      });
  }
}
