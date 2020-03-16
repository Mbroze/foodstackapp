import { Component, OnInit } from '@angular/core';
/* import { HTTP } from '@ionic-native/http/ngx'; */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  slides: any = [{
    image: 'https://imageslidermaker.com/gallery/ism/images/slides/bananas-698608_1280.jpg'
  },
  {
    image: 'https://imageslidermaker.com/gallery/ism/images/slides/background-2561_1280.jpg'
  },
  {
    image: 'https://imageslidermaker.com/gallery/ism/images/slides/background-2276_1280.jpg'
  }]


  menuData: any = [
    {
      id:1,
      name: 'Vada-Pav',
      price: 15,
      image: 'https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/glnraqp4kbvpy1smoui2'
    },
    {
      id:2,
      name: 'Samosa',
      price: 13,
      image: 'https://content.jdmagicbox.com/comp/mumbai/z7/022pxx22.xx22.190305132109.u6z7/catalogue/a-1-samosa-mumbai-samosa-delivery-services-vq5qpobp9u-250.jpg'
    },
    {
      id:3,
      name: 'Masala Dosa',
      price: 30,
      image: 'https://www.ticklingpalates.com/wp-content/uploads/2017/02/brown-rice-dosa-recipe-1-500x500.jpg'
    },
    {
      id:4,
      name: 'Idli Sambhar',
      price: 25,
      image: 'https://i2.wp.com/www.aayisrecipes.com/wp-content/uploads/2006/08/idli-sambar-chutney4-e1408641062305.jpg?resize=600%2C600&ssl=1'
    },
  ];

  constructor(private http: HttpClient,
    public cartService : CartService) {

  }

  ngOnInit() {
    this.http.get('http://192.168.43.168:9005/v1/fs/Services/GetAllMenu', {})
      .subscribe((response: any) => {
        this.menuData = response.Data
      })
  }

}
