import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordersuccess',
  templateUrl: './ordersuccess.page.html',
  styleUrls: ['./ordersuccess.page.scss'],
})
export class OrdersuccessPage implements OnInit {
  orderId: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id')
    this.orderId = ('000000' + this.orderId).slice(-8)
  }

}
