import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appPosition]'
})
export class PositionDirective {

    constructor(private el: ElementRef) {
        el.nativeElement.style.position = 'fixed';
    }

}
