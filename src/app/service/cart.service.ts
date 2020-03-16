import { Injectable } from '@angular/core';
import { Config } from "../config/config";
import { HttpService } from './http.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartDetails: any = []

  constructor(private httpService: HttpService, private storage: Storage,
    private loadingController: LoadingController) { }

  async getCartDetails() {

    let customerDetails = await this.storage.get('CustomerProfileData')
    customerDetails = JSON.parse(customerDetails)
    const postData = {
      "CustomerId": customerDetails.CustomerId
    }

    this.httpService.httpPost(`${Config.apiEndPoint}Services/CustomerGetCartDetails`, postData)
      .subscribe((response: any) => {
        this.cartDetails = response.Data.CustomerAddToCartData
      })
  }


  async addToCart(menuItem) {


    let qty, cartId;
    for (const cartItem of this.cartDetails) {
      if (cartItem.Menu_Id == menuItem.Menu_Id) {
        cartItem.Quantity++;
        await this.addCartDetails(cartItem.Cart_Id, cartItem.Menu_Id, cartItem.Quantity)
        return;
      }
    }

    menuItem.Quantity = 1
    await this.addCartDetails(null, menuItem.Menu_Id, menuItem.Quantity)
    // await this.addCartDetails


  }


  async addCartDetails(cartId, menuId, quantity) {

    const  loading= await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    })
   await loading.present();
    let customerDetails = await this.storage.get('CustomerProfileData')
    customerDetails = JSON.parse(customerDetails)
    const postData = {
      "Cart_Id": cartId,
      "Menu_Id": menuId,
      "CustomerId": customerDetails.CustomerId,
      "Quantity": quantity,
    }



    this.httpService.httpPost(`${Config.apiEndPoint}Services/CustomerAddToCart`, postData)
      .subscribe(async (response: any) => {
        await this.getCartDetails()
        await loading.dismiss();
        return;
        //this.cartDetails = response.Data.CustomerAddToCartData
      })
  }

  async removeFromCart(menuItem) {
    for (const [index, cartItem] of this.cartDetails.entries()) {
      if (cartItem.Menu_Id == menuItem.Menu_Id) {
        if (cartItem.Quantity == 1) {
          /* this.cartDetails.splice(index, 1); */
          cartItem.Quantity--
          await this.addCartDetails(cartItem.Cart_Id, cartItem.Menu_Id, cartItem.Quantity)

          return
        }
        cartItem.Quantity--
        await this.addCartDetails(null, menuItem.Menu_Id, menuItem.Quantity)
        // await this.addCartDetails()
       // await this.getCartDetails()
        return;
      }
    }
  }

  getItemTotal() {
    if (this.cartDetails.length > 0) {
      return this.cartDetails.reduce((total, item) => {
        return total + (item.Quantity * item.MenuPrice)
      }, 0)
    } else {
      return 0
    }
  }

  getProcessingFee() {
    return 0 //this.getItemTotal() * 2 / 100
  }


}
