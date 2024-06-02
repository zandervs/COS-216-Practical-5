import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.page.html',
  styleUrls: ['./listings.page.scss'],
})
export class ListingsPage implements OnInit {
  listings: any[] = [];
  isLoading = true;

  constructor(private http: HttpClient, private storage: Storage, private toastController: ToastController) {
    this.initializeStorage();
  }

  async initializeStorage() {
    await this.storage.create();
  }

  async ngOnInit() {
    const apiKey = await this.storage.get('apiKey');
    this.getListings(apiKey);
  }

  getListings(apiKey: string) {
    this.isLoading = true;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa('u23540207:bydpic-qeFmo3-wujpym')}`,
    });

    const body = {
      type: 'GetAllListings',
      apikey: apiKey,
      search: {
        price_min: 5000,
        price_max: 1000000000,
        location: 'Hatfield',
        type: 'Rent'
      },
      sort: 'price',
      order: 'ASC',
      return: [
        'id',
        'location',
        'title',
        'price',
        'bedrooms',
        'description',
        'images'
      ],
      fuzzy: true
    };

    this.http.post('https://wheatley.cs.up.ac.za/u23540207/api.php', body, { headers })
      .subscribe((response: any) => {
        if (response.status === 'success') {
          this.listings = response.data.map((listing: any) => {
            return {
              ...listing,
              description: this.formatDescription(listing.description)
            };
          });
        } else {
          console.error('Error fetching listings:', response.message);
        }
        this.isLoading = false;
      }, (error) => {
        console.error('Network error:', error);
        this.isLoading = false;
      });
  }

  async refreshListings(event: any) {
    const apiKey = await this.storage.get('apiKey');
    this.listings = [];
    this.getListings(apiKey);
    event.target.complete();
    const toast = await this.toastController.create({
      message: 'Latest data has been fetched.',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  formatDescription(description: string): string {
    if (description.startsWith(", ")) {
      description = description.slice(2);
    }
    description = description.replace(/,\s/g, '\n');
    if (description.length > 500) {
      description = description.substring(0, 500) + '...';
    }
    return description;
  }

  viewListing(id: number) {
    console.log('View listing with ID:', id);
  }
}