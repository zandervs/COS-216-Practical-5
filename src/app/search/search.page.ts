import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchLocation: string = '';
  sortOrder: string = 'ASC';
  propertyType: string = 'Buy';
  minPrice: number = 0;
  maxPrice: number = 1000000000;
  listings: any[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient, private storage: Storage) {}

  ngOnInit() {
    this.storage.create();
  }

  async performSearch() {
    if (!this.searchLocation) {
      return;
    }

    this.isLoading = true;
    const apiKey = await this.storage.get('apiKey');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa('u23540207:bydpic-qeFmo3-wujpym')}`,
    });

    const body = {
      type: 'GetAllListings',
      apikey: apiKey,
      limit: 30,
      search: {
        price_min: this.minPrice,
        price_max: this.maxPrice,
        location: this.searchLocation,
        type: this.propertyType
      },
      sort: 'price',
      order: this.sortOrder,
      return: [
        'id', 'location', 'title', 'price', 'bedrooms', 'description', 'images'
      ],
      fuzzy: true
    };

    this.http.post('https://wheatley.cs.up.ac.za/u23540207/api.php', body, { headers })
      .subscribe((response: any) => {
        if (response.status === 'success') {
          this.listings = response.data.map((listing: any) => {
            listing.description = this.formatDescription(listing.description);
            return listing;
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

  onSearchChange() {
    // Optionally, trigger search automatically on search bar input change
    this.performSearch();
  }

  formatDescription(description: string): string {
    if (description.startsWith(", ")) {
      description = description.slice(2);
    }
    description = description.replace(/\.,\s/g, '\n');
    if (description.length > 500) {
      description = description.substring(0, 500) + '...';
    }
    return description;
  }
}