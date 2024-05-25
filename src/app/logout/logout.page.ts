import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.storage.create();
  }

  async logout() {
    await this.storage.remove('apiKey');
    this.navCtrl.navigateRoot('/login');
  }
}