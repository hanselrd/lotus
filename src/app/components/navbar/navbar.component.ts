import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,
              public dbService: DatabaseService) { }

  ngOnInit() {
  }

}
