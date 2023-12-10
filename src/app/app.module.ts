import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToxicGasSenzorComponent } from './toxic-gas-senzor/toxic-gas-senzor.component';
import { RainSenzorComponent } from './rain-senzor/rain-senzor.component';
import { LevelSenzorComponent } from './level-senzor/level-senzor.component';
import { TempSensorComponent } from './temp-sensor/temp-sensor.component';
import { UmiditySensorComponent } from './umidity-sensor/umidity-sensor.component';
import { SwitchComponent } from './switch/switch.component';
import { HttpClientModule } from '@angular/common/http';
import { LevelSenzorService } from './level-senzor/level-senzor.service';
import { RainSenzorService } from './rain-senzor/rain-senzor.service';
import { SwitchService } from './switch/switch.service';
import { TempSensorService } from './temp-sensor/temp-sensor.service';
import { UmiditySensorService } from './umidity-sensor/umidity-sensor.service';
import { ToxicGasSensorService } from './toxic-gas-senzor/toxic-gas-senzor.service';

@NgModule({
  declarations: [
    AppComponent,
    ToxicGasSenzorComponent,
    RainSenzorComponent,
    LevelSenzorComponent,
    TempSensorComponent,
    UmiditySensorComponent,
    SwitchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [LevelSenzorService, RainSenzorService, SwitchService, TempSensorService, UmiditySensorService, ToxicGasSensorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
