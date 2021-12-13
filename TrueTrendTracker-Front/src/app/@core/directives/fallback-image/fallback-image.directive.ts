import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: 'img[appImgFallback]',
})

export class FallbackImageDirective {
 
	constructor(private element: ElementRef) {}

	@Input() appImgFallback = '';

	@HostListener('error')
	displayFallbackImg(): void {
		 this.element.nativeElement.src = this.appImgFallback || './assets/fallback.png';
	}

}