import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToxicGasSensorComponent } from './toxic-gas-senzor/toxic-gas-senzor.component';
import { RainSensorComponent } from './rain-senzor/rain-senzor.component';
import { LevelSensorComponent } from './level-senzor/level-senzor.component';
import { TempSensorComponent } from './temp-sensor/temp-sensor.component';
import { HumiditySensorComponent } from './umidity-sensor/umidity-sensor.component';
import { SwitchComponent } from './switch/switch.component';
import { HttpClientModule } from '@angular/common/http';
import { LevelSensorService } from './level-senzor/level-senzor.service';
import { RainSensorService } from './rain-senzor/rain-senzor.service';
import { SwitchService } from './switch/switch.service';
import { TempSensorService } from './temp-sensor/temp-sensor.service';
import { HumiditySensorService } from './umidity-sensor/umidity-sensor.service';
import { ToxicGasSensorService } from './toxic-gas-senzor/toxic-gas-senzor.service';
import { AngularMaterialModule } from './shared/angular-material.module';
import { UvIndexMapHelper } from './shared/sensors-data.helper';

@NgModule({
  declarations: [
    AppComponent,
    ToxicGasSensorComponent,
    RainSensorComponent,
    LevelSensorComponent,
    TempSensorComponent,
    HumiditySensorComponent,
    SwitchComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AngularMaterialModule],
  providers: [
    LevelSensorService,
    RainSensorService,
    SwitchService,
    TempSensorService,
    HumiditySensorService,
    ToxicGasSensorService,
    UvIndexMapHelper
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
