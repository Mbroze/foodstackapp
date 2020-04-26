import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { Config } from "./config/config";

@Directive({
  selector: '[appDefaultImage]'
})
export class DefaultImageDirective {

  @Input() defaultImg: string;

  constructor(private eRef: ElementRef) { }


  @HostListener('error')
  loadFallbackOnError() {

    console.log('defaultImg', this.defaultImg);

    const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
    element.src = this.defaultImg || Config.apiURL + 'MenuImage/default.jpg';
  }

}



@Directive({
  selector: '[appRewardImage]'
})
export class RewardImageDirective {

  @Input() defaultImg: string;

  constructor(private eRef: ElementRef) { }


  @HostListener('error')
  loadFallbackOnError() {

    console.log('defaultImg', this.defaultImg);

    const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
    element.src = this.defaultImg || 'assets/img/norewardimg.png';
  }

}
