import { Directive, AfterContentInit, Output, EventEmitter } from '@angular/core';

@Directive({
	selector: '[appAfterIf]'
})

export class AfterIfDirective implements AfterContentInit {
	@Output() appAfterIf: any
	public after: EventEmitter<void> = new EventEmitter<void>();

	public ngAfterContentInit(): void {
		setTimeout(() => this.after.next());
	}
}