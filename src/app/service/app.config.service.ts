import { Injectable } from '@angular/core';
import { Config } from '../models/config';
import { HttpClient, HttpBackend, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {

  static Settings: Config;
  private http: HttpClient;
  constructor(private httpBackEnd: HttpBackend) {
    this.http = new HttpClient(httpBackEnd);
  }
  load() {
    const jsonFile = 'assets/config.json';
    console.log('TCE: AppConfig -> load -> jsonFile', jsonFile);
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: Config) => {
      console.log('TCE: AppConfig -> load -> response', response);
        AppConfig.Settings = <Config>response;
        resolve();
      }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}