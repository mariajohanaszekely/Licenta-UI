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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
