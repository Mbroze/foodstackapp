import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
    private cartService : CartService) { }

  ngOnInit() {}

  goToCart() {
    this.router.navigateByUrl('tabs/tab2');
  }

}
