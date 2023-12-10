import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LevelSenzorService {
    constructor(private http: HttpClient) { }

    public getLevelSenzorData(): Observable<any> {
        return this.http.get(
            'https://api.thingspeak.com/channels/2354728/field/3.json'
        );
    }
}