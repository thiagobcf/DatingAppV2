import { Component } from '@angular/core';
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  regiterMode = false;

  registerToggle() {
    this.regiterMode = !this.regiterMode      // se atualmente for verdadeiro, será definido como falso.. se atualmente for falso, será definido como verdadeiro.
  }
}
