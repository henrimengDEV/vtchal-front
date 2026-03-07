import {Component, computed, inject, Signal} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {AvatarComponent} from './presentation/components/avatar/avatar.component';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AvatarComponent, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);

  protected url: Signal<string> = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((e: NavigationEnd) => e.urlAfterRedirects)
    ),
    {initialValue: this.router.url}
  );

  protected isActive = (path: string) => computed(() => this.url().includes(path));
}
