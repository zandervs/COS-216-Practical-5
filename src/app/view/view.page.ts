import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  propertyId: number = 0;
  property: any;
  images: string[] = [];
  mainImage: string = '';
  isLoading = true;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private storage: Storage
  ) { }

  async ngOnInit() {
    this.propertyId = +this.route.snapshot.paramMap.get('id')!;
    const apiKey = await this.storage.get('apiKey');
    this.getPropertyDetails(apiKey, this.propertyId);
  }

  getPropertyDetails(apiKey: string, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa('u23540207:bydpic-qeFmo3-wujpym')}`,
    });

    const body = {
      type: 'GetAllListings',
      apikey: apiKey,
      search: {
        id: id
      },
      return: '*'
    };

    this.http.post('https://wheatley.cs.up.ac.za/u23540207/api.php', body, { headers })
      .subscribe((response: any) => {
        if (response.status === 'success') {
          this.property = response.data[0];
          this.images = this.property.images.split(',').filter((img: string) => img.trim() !== '');
          this.mainImage = this.images[0];
        } else {
          console.error('Error fetching property details:', response.message);
        }
        this.isLoading = false;
      }, (error) => {
        console.error('Network error:', error);
        this.isLoading = false;
      });
  }

  setMainImage(image: string) {
    this.mainImage = image;
  }

  formatDescription(description: string): string {
    // Remove the leading ", " and split by "., " to add new lines
    const formattedDescription = description.replace(/^, /, '').split('., ').join('.<br><br>');
    return formattedDescription;
  }
}