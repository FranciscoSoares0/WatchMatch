import { ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,RouterModule, AvatarModule,CommonModule,ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {

  private readonly authService = inject(AuthService);
  user = this.authService.userSig;
  
  SignOut(){
    this.authService.logout();
  }
}
