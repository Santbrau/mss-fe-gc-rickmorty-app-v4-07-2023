import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loginForm: any = {};
  registerForm: any = {};

  showLoginForm: boolean = false;
  showRegisterForm: boolean = false;

  toggleLoginForm() {
    this.showLoginForm = !this.showLoginForm;
    this.showRegisterForm = false;
  }

  toggleRegisterForm() {
    this.showRegisterForm = !this.showRegisterForm;
    this.showLoginForm = false;
  }

ngOnInit(): void {

}

onClick() {
  this.userService.logout()
  .then(() => {
    this.router.navigate(['/login']);
  })
  .catch(error => console.log(error));
}
}
