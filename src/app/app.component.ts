import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mss-fe-gc-rickmorty-app-07-2023';
  searchQuery: string = '';

  constructor(private router: Router) {}

  searchCharacters() {
    this.router.navigate(['/characters'], { queryParams: { search: this.searchQuery } });
  }
}

