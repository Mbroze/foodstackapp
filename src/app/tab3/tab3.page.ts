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

  customerDetails: any
  orderList: any
  constructor(private httpService: HttpService, private storage: Storage,
    private loadingController: LoadingController,
    private navCtrl: NavController) { }

  async ngOnInit() {
    this.customerDetails = await this.storage.get('CustomerProfileData')
    this.customerDetails = JSON.parse(this.customerDetails)


    console.log(this.customerDetails);


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



        if (response.Data && response.Data.length > 0) {
          this.orderList = response.Data.slice(0, 5)
        }

        console.log(this.orderList);

        await loading.dismiss();
        /*  this.storage.set('CustomerProfileData', JSON.stringify(response.Data.CustomerProfileData)); */
        //this.menuData = response.Data
      })
  }


  getStatus(status) {
    if (status == "PENDING") {
      return "Out for Delivery"
    } else if (status == "SUCCESS") {
      return "Delivered"
    } else {
      return status
    }
  }

  goBack() {
    this.navCtrl.back();
  }

}
