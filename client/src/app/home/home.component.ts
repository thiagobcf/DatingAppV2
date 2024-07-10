import { Component, inject, type OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  regiterMode = false;
  users: any;

  ngOnInit(): void {
      this.getUsers();
  }

  registerToggle() {
    this.regiterMode = !this.regiterMode      // se atualmente for verdadeiro, será definido como falso.. se atualmente for falso, será definido como verdadeiro.
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error  => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }
}
