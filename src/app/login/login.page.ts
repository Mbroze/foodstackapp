import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from "../service/http.service";
import { Config } from "../config/config";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  errMessage: string;

  constructor(private router: Router, private utilService: UtilService,
    private httpService: HttpService, private storage: Storage, ) { }

  ngOnInit() {
  }

  register(form) {

    const postData = {
      MobileNo: form.value.mobile
    }

    this.httpService.httpPost(`${Config.apiEndPoint}Services/CustomerLogin`, postData)
      .subscribe(async (response: any) => {
       
        if (response.Data.isSuccess) {
          this.storage.set('CustomerProfileData', JSON.stringify(response.Data.CustomerProfileData));
          this.storage.set('CustomerOtpData', JSON.stringify(response.Data.CustomerOtpData));
                    

          await this.utilService.presentToast('Login Successfully')
          this.router.navigate(['otp'])
        } else {
          this.errMessage = response.message
          await this.utilService.presentToast(this.errMessage)
        }
      })



  }

}
