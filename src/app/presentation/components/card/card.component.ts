import {Component, input, InputSignal, Signal} from '@angular/core';

@Component({
  selector: 'card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  cutted: InputSignal<boolean> = input(false);
}
