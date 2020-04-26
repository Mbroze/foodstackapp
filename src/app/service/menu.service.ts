import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Config } from "../config/config";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpService : HttpService) { }

  searchMenu(searchText){
    let url:string = `${Config.apiEndPoint}Services/GetMenuByName?Name=${searchText}`
    return this.httpService.httpPost(url,{})

  }

  getCategories(){
    let url:string = `${Config.apiEndPoint}Services/GetAllCategories`
    return this.httpService.httpGet(url)
  }

  getMenuByCategories(category){
    let url:string = `${Config.apiEndPoint}Services/GetMenuByCategory?categoryName=${category}`
    return this.httpService.httpPost(url,{})
  }

}
