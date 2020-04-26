import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Config } from "../config/config";
import { HttpService } from "../service/http.service";
import { UtilService } from '../service/util.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  customerDetails: any
  constructor(public cartService: CartService,
    private utilService: UtilService,
    private storage: Storage,
    private router: Router,
    private httpService: HttpService,
    private loadingController: LoadingController,
    private navCtrl: NavController) {

  }

  /* async ngOnInit() {
    this.cartService.getCartDetails().then(() => { })
    this.customerDetails = await this.storage.get('CustomerProfileData')
    this.customerDetails = JSON.parse(this.customerDetails)

    console.log(this.customerDetails);


  } */

  async ionViewWillEnter() {

    setTimeout(async () => {
      this.cartService.getCartDetails().then(() => { })
      this.customerDetails = await this.storage.get('CustomerProfileData')
      this.customerDetails = JSON.parse(this.customerDetails)

      console.log(this.customerDetails);
    }, 1000);



  }

  goBack() {
    this.navCtrl.back();
  }




  async checkOut() {
    console.log(this.customerDetails)

    const custDetails = await this.storage.get('CustomerProfileData')
    this.customerDetails = JSON.parse(custDetails)
    if (this.customerDetails.Address && this.customerDetails.FirstName) {


      const postData = {
        "CustomerId": this.customerDetails.CustomerId,
        "TotalAmount": this.cartService.getItemTotal(),
      }

      const loading = await this.loadingController.create({
        message: 'Please wait...',
        duration: 2000
      })
      await loading.present();

      this.httpService.httpPost(`${Config.apiEndPoint}Services/CustomerPlaceOrder`, postData)
        .subscribe(async (response: any) => {

          if (response.Data.isSuccess) {
            this.utilService.presentToast('Payment Successfully Done.')
          } else {
            this.utilService.presentToast(response.Data.Message)
          }

          this.cartService.getCartDetails()
          this.router.navigate([`ordersuccess/${response.Data.CustomerPlaceOrderHistoryData[0].Order_Id}`])
          await loading.dismiss();
          return;
          //this.cartDetails = response.Data.CustomerAddToCartData
        })

    } else {
      this.router.navigate(['update-profile'])
    }


  }
}
