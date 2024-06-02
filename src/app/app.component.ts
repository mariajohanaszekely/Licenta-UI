import { Component, OnInit, ViewChild } from '@angular/core';
import { LevelSensorService } from './level-senzor/level-senzor.service';
import { RainSensorService as RainSensorService } from './rain-senzor/rain-senzor.service';
import { SwitchService } from './switch/switch.service';
import { TempSensorService } from './temp-sensor/temp-sensor.service';
import { ToxicGasSensorService } from './toxic-gas-senzor/toxic-gas-senzor.service';
import { HumiditySensorService as HumiditySensorService } from './humidity-sensor/humidity-sensor.service';
import { LevelSensorModel } from './level-senzor/level-senzor.model';
import { RainSensorModel as RainSensorModel } from './rain-senzor/rain-senzor.model';
import { SwitchModel } from './switch/switch.model';
import { TempSensorModel } from './temp-sensor/temp-sensor.model';
import { ToxicGasSensorModel } from './toxic-gas-senzor/toxic-gas-senzor.model';
import { HumiditySensorModel } from './humidity-sensor/humidity-sensor.model';

import * as XLSX from 'xlsx';
import { AccelerationSensorModel } from './acceleration-sensor/acceleration-sensor.model';
import { AccelerationSensorService } from './acceleration-sensor/acceleration-sensor.service';
import { ParkSensorService } from './park-sensor/park-sensor.service';
import { ParkSensorModel } from './park-sensor/park-sensor.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public lastUpdate: Date;
  public isLoading: boolean = false;

  private levelSensorLastValue: string;
  private rainSensorLastValue: string;
  public switchLastValue: string;
  private tempSensorLastValue: string;
  private toxicGasSensorLastValue: string;
  private humiditySensorLastValue: string;
  public accelerationSensorLastValue: string;
  private parkSensorLastValue: string;

  constructor(
    private levelSensorService: LevelSensorService,
    private rainSensorService: RainSensorService,
    private switchService: SwitchService,
    private tempSensorService: TempSensorService,
    private toxicGasSensorService: ToxicGasSensorService,
    private humiditySensorService: HumiditySensorService,
    private accelerationSensorService: AccelerationSensorService,
    private parkSensorService: ParkSensorService
  ) { }

  ngOnInit(): void {
    this.initializeSensorsData();
  }

  public refreshData(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      window.location.reload();
    }, 1000);
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
      [
        'Accident :',
        this.accelerationSensorLastValue === '0'
          ? 'No accident reported'
          : 'There is an accident',
      ],
      [
        'The car is :',
        this.parkSensorLastValue === '0' ? 'In park mode' : 'In drive mode',
      ],
    ];

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SensorsData');
    XLSX.writeFile(wb, 'sensors_data.xlsx');
  }

  private initializeSensorsData() {
    this.getLastUpdateDateFromSensors();

    this.getDataFromLevelSensor();
    this.getDataFromRainSensor();
    this.getDataFromSwitch();
    this.getDataFromTempSensor();
    this.getToxicGasSensorData();
    this.getDataFromHumiditySensor();
    this.getDataFromAccelerationSensor();
    this.getDataFromParkSensor();
  }

  private getLastUpdateDateFromSensors(): void {
    this.levelSensorService.getLevelSensorData().subscribe((sensorData) => {
      this.lastUpdate =
        sensorData.feeds[sensorData.feeds.length - 1].created_at;
    });
  }

  private getDataFromLevelSensor() {
    this.levelSensorService.getLevelSensorData().subscribe((sensorData) => {
      let levelSensorValues: string[] = [];

      sensorData.feeds.forEach((feed: LevelSensorModel) => {
        levelSensorValues.push(feed.field3);
      });
      this.levelSensorLastValue =
        levelSensorValues[levelSensorValues.length - 1];
    });
  }

  private getDataFromRainSensor(): void {
    this.rainSensorService.getRainSensorData().subscribe((sensorData) => {
      let rainSensorValues: string[] = [];

      sensorData.feeds.forEach((feed: RainSensorModel) => {
        rainSensorValues.push(feed.field4);
      });
      this.rainSensorLastValue = rainSensorValues[rainSensorValues.length - 1];
    });
  }

  private getDataFromSwitch(): void {
    this.switchService.getSwitchData().subscribe((sensorData) => {
      let switchValues: string[] = [];

      sensorData.feeds.forEach((feed: SwitchModel) => {
        switchValues.push(feed.field5);
      });
      this.switchLastValue = switchValues[switchValues.length - 1];
    });
  }

  private getDataFromTempSensor(): void {
    this.tempSensorService.getTempSensorData().subscribe((sensorData) => {
      let tempSensorValues: string[] = [];

      sensorData.feeds.forEach((feed: TempSensorModel) => {
        tempSensorValues.push(feed.field1);
      });
      this.tempSensorLastValue = tempSensorValues[tempSensorValues.length - 1];
    });
  }

  private getToxicGasSensorData(): void {
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

  private getDataFromHumiditySensor(): void {
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

  private getDataFromAccelerationSensor(): void {
    this.accelerationSensorService
      .getAccelerationSensorData()
      .subscribe((sensorData) => {
        let accelerationSensorValues: string[] = [];

        sensorData.feeds.forEach((feed: AccelerationSensorModel) => {
          accelerationSensorValues.push(feed.field7);
        });
        this.accelerationSensorLastValue =
          accelerationSensorValues[accelerationSensorValues.length - 1];
      });
  }

  private getDataFromParkSensor(): void {
    this.parkSensorService.getParkSensorData().subscribe((sensorData) => {
      let parkSensorValues: string[] = [];

      sensorData.feeds.forEach((feed: ParkSensorModel) => {
        parkSensorValues.push(feed.field8);
      });
      this.parkSensorLastValue = parkSensorValues[parkSensorValues.length - 1];
    });
  }
}
