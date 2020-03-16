import { Component, OnInit } from '@angular/core';
/* import { HTTP } from '@ionic-native/http/ngx'; */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../service/cart.service';
import { HttpService } from "../service/http.service";
import { Config } from "../config/config";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  slides: any = [{
    image: 'https://imageslidermaker.com/gallery/ism/images/slides/bananas-698608_1280.jpg'
  },
  {
    image: 'https://imageslidermaker.com/gallery/ism/images/slides/background-2561_1280.jpg'
  },
  {
    image: 'https://imageslidermaker.com/gallery/ism/images/slides/background-2276_1280.jpg'
  }]


  categories: any = [{
    cat_id: '1',
    name: 'Chinese',
    image: '/assets/images/cat-chinese.jpg'
  }, {
    cat_id: '2',
    name: 'Pizza',
    image: '/assets/images/cat-chinese.jpg'
  }, {
    cat_id: '3',
    name: 'Dosa',
    image: '/assets/images/cat-chinese.jpg'
  },
  {
    cat_id: '1',
    name: 'Chinese',
    image: '/assets/images/cat-chinese.jpg'
  }, {
    cat_id: '2',
    name: 'Pizza',
    image: '/assets/images/cat-chinese.jpg'
  }, {
    cat_id: '3',
    name: 'Dosa',
    image: '/assets/images/cat-chinese.jpg'
  }]

  menuData: any = [
    {
      id: 1,
      name: 'Vada-Pav',
      price: 15,
      image: 'https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/glnraqp4kbvpy1smoui2'
    },
    {
      id: 2,
      name: 'Samosa',
      price: 13,
      image: 'https://content.jdmagicbox.com/comp/mumbai/z7/022pxx22.xx22.190305132109.u6z7/catalogue/a-1-samosa-mumbai-samosa-delivery-services-vq5qpobp9u-250.jpg'
    },
    {
      id: 3,
      name: 'Masala Dosa',
      price: 30,
      image: 'https://www.ticklingpalates.com/wp-content/uploads/2017/02/brown-rice-dosa-recipe-1-500x500.jpg'
    },
    {
      id: 4,
      name: 'Idli Sambhar',
      price: 25,
      image: 'https://i2.wp.com/www.aayisrecipes.com/wp-content/uploads/2006/08/idli-sambar-chutney4-e1408641062305.jpg?resize=600%2C600&ssl=1'
    },
  ];

  constructor(
    private httpService: HttpService,
    private loadingController: LoadingController,
    public cartService: CartService) {

  }

 async ngOnInit() {

  const  loading= await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    })
   await loading.present();

    this.httpService.httpGet(`${Config.apiEndPoint}Services/GetAllMenu`)
      .subscribe(async (response: any) => {
        this.menuData = response.Data
        await loading.dismiss();
      })
    

    this.cartService.getCartDetails().then(() => { })
  }


  getCategories() {
   /*  const postData = {
      CustomerId: this.customerDetails.CustomerId,
      MobileNo: this.customerDetails.MobileNo,
      OTP: this.otpPin
    }

    this.httpService.httpPost(`${Config.apiEndPoint}Services/ValidateCustomerOTP`, postData)
      .subscribe(async (response: any) => {
       

        if (response.Data.isSuccess) {
          //this.storage.set('CustomerProfileData', JSON.stringify(response.Data.CustomerProfileData));
          await this.utilService.presentToast('OTP Verified Successfully')
          this.router.navigate([''])
        } else {
          this.errMessage = response.Data.Message
          await this.utilService.presentToast(this.errMessage)
        }
      }) */
  }




}
