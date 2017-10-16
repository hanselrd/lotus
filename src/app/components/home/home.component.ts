import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services/auth/auth.service';
import { IpService } from './../../services/ip/ip.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService,
              public ipService: IpService) { }

  ngOnInit() {
  }

}
