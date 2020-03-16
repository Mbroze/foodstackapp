import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { HttpService } from '../service/http.service';
import { Config } from "../config/config";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  gender: any = 'Male';
  customerDetails: any;
  firstname: string;
  lastname: string;
  email: string;
  mobile: any;
  custType: any = 'Student';
  address: any;

  constructor(private navCtrl: NavController,
    private httpService: HttpService,
    private loadingController: LoadingController,
    private storage: Storage) { }

  async ngOnInit() {
    this.customerDetails = await this.storage.get('CustomerProfileData')
    this.customerDetails = JSON.parse(this.customerDetails)
    console.log(this.customerDetails);
    this.firstname = this.customerDetails.FirstName
    this.lastname = this.customerDetails.LastName
    this.mobile = this.customerDetails.MobileNo
    this.email = this.customerDetails.Email
    this.address = this.customerDetails.Address
    this.custType = this.customerDetails.Category ? this.customerDetails.Category : 'Student'
    this.gender = this.customerDetails.Gender ? this.customerDetails.Gender : 'Male'
  }


  goBack() {
    this.navCtrl.back();
  }

  async  saveDetails(form) {
 /*    const firstname = form.value.firstname
    const lastname = form.value.lastname
    const gender = form.value.gender
    const address = form.value.address
    const email = form.value.email
    const custType = form.value.custType */

    console.log(form);
    

    const postData = {
      CustomerId: this.customerDetails.CustomerId,
      "MobileNo": this.customerDetails.MobileNo,
      "FirstName": this.firstname,
      "LastName": this.lastname,
      "Gender": this.gender,
      "Email": this.email,
      "Address": this.address,
      "Category": this.custType
    }

    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    })
    await loading.present();

    this.httpService.httpPost(`${Config.apiEndPoint}Services/UpdateCustomerProfile`, postData)
      .subscribe(async (response: any) => {
        if (response.Data.isSuccess)
         this.storage.set('CustomerProfileData', JSON.stringify(response.Data.CustomerProfileData));
        //this.menuData = response.Data
        await loading.dismiss();
        this.goBack()
      })

  }

}
