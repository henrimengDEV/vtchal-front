import {Component, computed, input} from '@angular/core';

@Component({
  selector: 'avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
  fullName = input<string>('');
  alt = input<string>();
  presenceIndicator = input<'online' | 'offline' | null>(null);

  protected initials = computed(() => {
    const firstWord = this.fullName().trim().split(/\s+/).filter(Boolean)[0] ?? '';
    const letters = firstWord.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase();
    return letters || '--';
  });
}
