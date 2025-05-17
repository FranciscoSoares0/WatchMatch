import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  private readonly authService = inject(AuthService);

  ngOnInit():void{
    this.authService.getProfile().subscribe({
      next: (user) => this.authService.userSig.set(user),
      error: () => this.authService.userSig.set(null),
    });
  }
}
