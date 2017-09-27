import { Component } from '@angular/core';
// for testing
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from './services/auth/auth.service';
import { DatabaseService } from './services/database/database.service';
import { ElectronService } from './services/electron/electron.service';
import { ElectronHwidService } from './services/electron-hwid/electron-hwid.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loginForm: FormGroup;
  users: FirebaseListObservable<User[]>;
  admins: FirebaseListObservable<any[]>;

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService,
              public databaseService: DatabaseService,
              public electronService: ElectronService,
              public electronHwidService: ElectronHwidService) {
    this.loginForm = formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });

    this.users = databaseService.afDb.list('/users');
    this.admins = databaseService.afDb.list('/roles/admins');

    authService.user
      .subscribe(user => {
        if (user) {
          console.log(user.toJSON());
        }
      });

    console.log('electron', electronService.isElectron());
    if (electronService.isElectron()) {
      console.log(electronService.os.platform(), electronService.os.arch());
      electronHwidService.hwid
        .then(data => console.log('hwid', data));
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  signIn() {
    this.authService.signInWithEmailAndPassword(this.email.value, this.password.value)
      .then(a => {
        console.log('Signed In');

        this.authService.user
          .subscribe(user => {
            this.admins.update(user.uid, {
              log: 0
            });
          });

        // Update user info
        if (this.electronService.isElectron()) {
          this.electronHwidService.hwid
            .then(hwid => {
              let temp = new User();
              temp.hwid = hwid;
              temp.platform = this.electronService.os.platform();
              temp.arch = this.electronService.os.arch();
              temp.lastLogin = Date.now();
              this.authService.user
                .subscribe(user => {
                  this.users.update(user.uid, temp);
                });
            });
        }
      })
      .catch(a => console.log(a.message));
  }

  openFile() {
    if (this.electronService.isElectron()) {
      this.electronService.remote.dialog.showOpenDialog({
        title: 'find file for me',
        properties: ['openFile', 'showHiddenFiles']
      }, (filePaths: string[]) => {
        console.log(filePaths);
      });
    }
  }

  showMessage() {
    if (this.electronService.isElectron()) {
      this.electronService.remote.dialog.showMessageBox({
        title: 'test',
        message: 'test_message',
        type: 'info',
        buttons: ['OK', 'Cancel']
      }, (response: number, checkboxChecked: boolean) => {
        console.log(response, checkboxChecked);
      });
    }
  }

}
