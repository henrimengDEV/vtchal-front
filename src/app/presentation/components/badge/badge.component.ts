import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'badge',
  imports: [
    NgClass
  ],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css'
})
export class BadgeComponent {
  type = input.required<'info' | 'success' | 'warning'>();
}
