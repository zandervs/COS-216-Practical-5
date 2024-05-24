import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private http: HttpClient, private storage: Storage) {
    this.storage.create();
  }

  async login() {
    const loginData = {
      type: 'Login',
      email: this.username,
      password: this.password
    };

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('u23540207:bydpic-qeFmo3-wujpym'),
      'Content-Type': 'application/json'
    });

    this.http.post('https://wheatley.cs.up.ac.za/u23540207/api.php', loginData, { headers })
      .subscribe(async (response: any) => {
        if (response.status === 'success') {
          await this.storage.set('apiKey', response.data.apikey);
          this.navCtrl.navigateRoot('/tabs');
        } else {
          // Handle login error
          console.log('Login failed: ' + response.message);
        }
      }, (error) => {
        // Handle network or server error
        console.log('Network or server error: ', error);
      });
  }

  ngOnInit() {
  }
}