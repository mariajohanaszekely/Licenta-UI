import { LevelSensorService } from '../level-senzor/level-senzor.service';
import { SwitchService } from '../switch/switch.service';
import { TempSensorService } from '../temp-sensor/temp-sensor.service';
import { ToxicGasSensorService } from '../toxic-gas-senzor/toxic-gas-senzor.service';
import { RainSensorService } from '../rain-senzor/rain-senzor.service';
import { HumiditySensorService } from '../umidity-sensor/umidity-sensor.service';
import { LevelSensorModel } from '../level-senzor/level-senzor.model';
import { RainSensorModel } from '../rain-senzor/rain-senzor.model';
import { SwitchModel } from '../switch/switch.model';
import { TempSensorModel } from '../temp-sensor/temp-sensor.model';
import { HumiditySensorModel } from '../umidity-sensor/umidity-sensor.model';
import { ToxicGasSensorModel } from '../toxic-gas-senzor/toxic-gas-senzor.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UvIndexMapHelper {
  constructor(
    private levelSensorService: LevelSensorService,
    private rainSensorService: RainSensorService,
    private switchService: SwitchService,
    private tempSensorService: TempSensorService,
    private toxicGasSensorService: ToxicGasSensorService,
    private humiditySensorService: HumiditySensorService
  ) {}

  public levelSensorLastValue: string;
  public rainSensorLastValue: string;
  public switchLastValue: string;
  public tempSensorLastValue: string;
  public ToxicGasSensorLastValue: string;
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
      let levelSensorValues: string[] = [];

      sensorData.feeds.forEach((feed: RainSensorModel) => {
        levelSensorValues.push(feed.field4);
      });
      this.levelSensorLastValue =
        levelSensorValues[levelSensorValues.length - 1];
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
      let sensorValues: string[] = [];

      sensorData.feeds.forEach((feed: TempSensorModel) => {
        sensorValues.push(feed.field1);
      });
      this.tempSensorLastValue = sensorValues[sensorValues.length - 1];
    });
  }

  public getToxicGasSensorData(): void {
    this.toxicGasSensorService
      .getToxicGasSensorData()
      .subscribe((sensorData) => {
        let sensorValues: string[] = [];

        sensorData.feeds.forEach((feed: ToxicGasSensorModel) => {
          sensorValues.push(feed.field6);
        });
        this.ToxicGasSensorLastValue = sensorValues[sensorValues.length - 1];
      });
  }

  public getDataFromHumiditySensor(): void {
    this.humiditySensorService
      .getHumiditySensorData()
      .subscribe((sensorData) => {
        let sensorValues: string[] = [];

        sensorData.feeds.forEach((feed: HumiditySensorModel) => {
          sensorValues.push(feed.field2);
        });
        this.humiditySensorLastValue = sensorValues[sensorValues.length - 1];
      });
  }
}
