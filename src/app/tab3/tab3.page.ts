import { Component, OnInit } from '@angular/core';
import { Config } from "../config/config";
import { HttpService } from "../service/http.service";
import { Storage } from '@ionic/storage';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  customerDetails:any
  constructor(private httpService: HttpService, private storage: Storage,
    private loadingController: LoadingController,
    private navCtrl: NavController) { }

  async ngOnInit() {

   /*  const postData = {
      CustomerId: this.customerDetails.CustomerId,
      "MobileNo": this.customerDetails.MobileNo,
      "FirstName": "Siddhesh",
      "LastName": "Bait",
      "Email": "sidbait@gmail.com",
      "Address": "Boisar",
      "Category": "Staff"
    } */
   /*  this.httpService.httpPost(`${Config.apiEndPoint}Services/UpdateCustomerProfile`, postData)
      .subscribe((response: any) => {
        
        if (response.Data.isSuccess)
          this.storage.set('CustomerProfileData', JSON.stringify(response.Data.CustomerProfileData));
        //this.menuData = response.Data
      }) */
  }

  async ionViewWillEnter() {
    this.customerDetails = await this.storage.get('CustomerProfileData')
    this.customerDetails = JSON.parse(this.customerDetails)


    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    })
    await loading.present();
    const postData = {
      CustomerId: this.customerDetails.CustomerId,
    }
    this.httpService.httpPost(`${Config.apiEndPoint}Services/GetCustomerPlaceOrderHistory`, postData)
    .subscribe(async (response: any) => {
      
      
      
      if (response.Data.isSuccess){}
      await loading.dismiss();
       /*  this.storage.set('CustomerProfileData', JSON.stringify(response.Data.CustomerProfileData)); */
      //this.menuData = response.Data
    }) 
  }

  goBack() {
    this.navCtrl.back();
    }

}
