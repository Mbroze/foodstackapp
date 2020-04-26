import { Component, OnInit } from '@angular/core';
/* import { HTTP } from '@ionic-native/http/ngx'; */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../service/cart.service';
import { HttpService } from "../service/http.service";
import { Config } from "../config/config";
import { LoadingController } from '@ionic/angular';
import { MenuService } from '../service/menu.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  searchText: string = '';
  selectedCategory: string = 'All'

  slides: any = [{
    image: 'https://imageslidermaker.com/gallery/ism/images/slides/bananas-698608_1280.jpg'
  },
  {
    image: 'https://imageslidermaker.com/gallery/ism/images/slides/background-2561_1280.jpg'
  },
  {
    image: 'https://imageslidermaker.com/gallery/ism/images/slides/background-2276_1280.jpg'
  }]


  categories: any;

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
    public menuService: MenuService,
    public cartService: CartService) {

  }

  async ngOnInit() {

    this.getAllMenu();

    this.getCategories();

    this.cartService.getCartDetails().then(() => { })
  }

  async getAllMenu() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    })
    await loading.present();

    this.httpService.httpGet(`${Config.apiEndPoint}Services/GetAllMenu`)
      .subscribe(async (response: any) => {
        this.menuData = response.Data
        await loading.dismiss();
      })
  }

  async getCategories() {

    this.menuService.getCategories()
      .subscribe(async (response: any) => {
        const tempArr = [{ "Menu_Category": 'All', "Menu_Image": '/assets/images/cat-chinese.jpg' }]
        this.categories = [...tempArr, ...response.Data]

      })

    /*
 
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

  async searchMenu() {

    if (this.searchText) {

      this.selectedCategory = ''
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        duration: 2000
      })
      await loading.present();


      console.log(this.searchText);
      this.menuService.searchMenu(this.searchText)
        .subscribe(async (response: any) => {
          this.menuData = response.Data
          await loading.dismiss();
        })

    }
  }

  async getMenuByCategories(category) {



    if (category && category != this.selectedCategory) {

      console.log(category);
      

      const loading = await this.loadingController.create({
        message: 'Please wait...',
        duration: 2000
      })
      await loading.present();

      if (category == 'All') {
        this.getAllMenu();
      }
      console.log(category);
      this.menuService.getMenuByCategories(category)
        .subscribe(async (response: any) => {
          this.menuData = response.Data

          this.selectedCategory = category
          await loading.dismiss();
        })

    }
  }

  sort() {
    this.menuData.sort(function (a, b) {
      console.log(a.Price, b.Price);

      return a.Price - b.Price;
    });

    console.log(this.menuData);

    console.log("sort")
  }



}
