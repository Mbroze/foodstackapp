import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from "../service/http.service";
import { Config } from "../config/config";
import { Storage } from '@ionic/storage';
import { UtilService } from "../service/util.service";
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  @ViewChild('otpForm', { static: true }) otpFormElement: any;


  customerDetails: any
  CustomerOtpData: any
  constructor(private router: Router, private httpService: HttpService, private storage: Storage,
    private utilService: UtilService, private cartService: CartService) { }
  errMessage: string = '';
  otpPin: any;

  async ngOnInit() {

    this.customerDetails = await this.storage.get('CustomerProfileData')
    this.customerDetails = JSON.parse(this.customerDetails)
    this.CustomerOtpData = await this.storage.get('CustomerOtpData')
    this.CustomerOtpData = JSON.parse(this.CustomerOtpData)
    

    setTimeout(() => {
      this.otpPin = this.CustomerOtpData.OTP
      this.otpSubmit();
    }, 1000);
  }

  async otpSubmit() {

    const postData = {
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
      })

  }

}
