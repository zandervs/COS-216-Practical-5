import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private http: HttpClient, private storage: Storage) {
    this.storage.create();
  }

  async register() {
    const registerData = {
      type: 'Register',
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password
    };

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('u23540207:bydpic-qeFmo3-wujpym'),
      'Content-Type': 'application/json'
    });

    this.http.post('https://wheatley.cs.up.ac.za/u23540207/api.php', registerData, { headers })
      .subscribe(async (response: any) => {
        if (response.status === 'success') {
          await this.storage.set('apiKey', response.data.apikey);
          this.navCtrl.navigateRoot('/tabs');
        } else {
          // Handle register error
          console.log('Registration failed: ' + response.message);
        }
      }, (error) => {
        // Handle network or server error
        console.log('Network or server error: ', error);
      });
  }
}