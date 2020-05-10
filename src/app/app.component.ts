import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { HttpService } from './service/http.service';
import { Config } from './config/config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private httpService: HttpService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.updateImagePath()
      let customerDetails = await this.storage.get('CustomerProfileData')
      if (!customerDetails) this.router.navigate(['login'])
      this.splashScreen.hide();
    });
  }


  updateImagePath() {
    this.httpService.httpGet(`${Config.apiEndPoint}Configure/UpdateMenuImagePath`)
      .subscribe(async (response: any) => {
        console.log('updateImagePath', response)
      })
  }
}
