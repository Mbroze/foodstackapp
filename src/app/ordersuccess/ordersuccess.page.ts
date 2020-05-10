import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpService } from '../service/http.service';
import { Storage } from '@ionic/storage';
import { Config } from '../config/config';

@Component({
  selector: 'app-ordersuccess',
  templateUrl: './ordersuccess.page.html',
  styleUrls: ['./ordersuccess.page.scss'],
})
export class OrdersuccessPage implements OnInit {
  orderId: any;
  orderIdLong: any;
  minutesToDeliver: number;
  customerDetails: any;
  orderDetails: any;
  totalBill: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private httpService: HttpService,
    private storage: Storage) { }

  async ngOnInit() {
    this.customerDetails = await this.storage.get('CustomerProfileData')
    this.customerDetails = JSON.parse(this.customerDetails)

    this.orderId = this.activatedRoute.snapshot.paramMap.get('id')
    this.orderIdLong = ('000000' + this.orderId).slice(-8)

    this.getOrderDetails(this.orderId)

  }

  async getOrderDetails(orderId) {

    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    })
    await loading.present();
    const postData = {
      CustomerId: this.customerDetails.CustomerId,
      Order_Id: parseInt(this.orderId)
    }
    this.httpService.httpPost(`${Config.apiEndPoint}Services/GetCustomerPlaceOrderHistory`, postData)
      .subscribe(async (response: any) => {
        console.log('getOrderDetails ------------------');
        console.log(response);

        this.orderDetails = response.Data
        this.minutesToDeliver = 0
        for (const order of response.Data) {
          this.minutesToDeliver = order.Menu_Time > this.minutesToDeliver ? order.Menu_Time : this.minutesToDeliver
          this.totalBill += order.Amount
        }

        await loading.dismiss();
        /*  this.storage.set('CustomerProfileData', JSON.stringify(response.Data.CustomerProfileData)); */
        //this.menuData = response.Data
      })
  }

}
