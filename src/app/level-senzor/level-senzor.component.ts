import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-level-senzor',
  templateUrl: './level-senzor.component.html',
  styleUrls: ['./level-senzor.component.css']
})
export class LevelSenzorComponent {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDataFromSensor();
  }

  public senzorData;

  public getDataFromSensor() {
    this.http.get('https://thingspeak.com/channels/2354728/field/3.json').subscribe((data: any) => {
      this.senzorData = data.feeds;
    });
  }
}
