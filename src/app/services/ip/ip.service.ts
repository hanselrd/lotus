import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IpService {

  private _ip: string;

  constructor(private http: HttpClient) {
    http.get('https://jsonip.com')
    .subscribe(response => {
      this._ip = response['ip'];
    });
  }

  get ip() {
    return this._ip;
  }

}
