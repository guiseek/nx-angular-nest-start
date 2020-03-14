import { animate, query, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';

const $timing = '200ms ease-out';

@Component({
  selector: 'wws-flip',
  templateUrl: './flip.component.html',
  styleUrls: ['./flip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('flip', [
      transition('* => *', [

        query(':enter', style({ transform: 'rotateY(-90deg)' }), { optional: true }),

        query(':leave', [
          animate($timing, style({ transform: 'rotateY(90deg)' }))
        ], { optional: true }),

        query(':enter', [
          animate($timing, style({ transform: 'rotateY(0)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class FlipComponent {
  @HostBinding('class.wws-flip')
  public flip = true;

  @Input('flipped') set flipping(value: boolean) { this.flipped = coerceBooleanProperty(value); }
  @HostBinding('@flip')
  public flipped = false;

  @Output() flippedChange = new EventEmitter<boolean>();
  @HostListener('@flip.done') done() { this.flippedChange.emit(this.flipped); }
}