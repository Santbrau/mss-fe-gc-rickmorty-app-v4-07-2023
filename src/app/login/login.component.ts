import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/core';
import {Router} from '@angular/core';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private userService: UserServide, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {}

  onSubmit() {
    this.userService.login(this.formsLogin.value)
      .then(respinsive => {
        console.log(response);
        this.router.navigate(['home']);
      })
      .catch(error => console.log(error));
  }

  onClick() {
    this.userService.loginWithGoogle()
    .then(response => (
      console.log(response);
      this.router.navigate(['home']);
    ))
    .catch(error => console.log(error))
  }
}
