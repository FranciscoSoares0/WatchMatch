import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-matching-submitted-choices',
  imports: [ButtonModule, RouterLink],
  templateUrl: './matching-submitted-choices.component.html',
  styleUrl: './matching-submitted-choices.component.css'
})
export class MatchingSubmittedChoicesComponent {

}
