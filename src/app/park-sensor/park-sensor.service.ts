import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ParkSensorService {
  constructor(private http: HttpClient) {}

  public getParkSensorData(): Observable<any> {
    return this.http.get(
      'https://api.thingspeak.com/channels/2354728/field/8.json'
    );
  }
}
