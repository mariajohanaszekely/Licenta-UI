import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ToxicGasSensorService {
    constructor(private http: HttpClient) { }

    public getToxicGasSensorData(): Observable<any> {
        return this.http.get(
            'https://api.thingspeak.com/channels/2354728/field/6.json'
        );
    }
}