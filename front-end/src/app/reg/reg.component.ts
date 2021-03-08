import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {

  name: string
  login: string
  email: string
  password: string

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signUp() {
    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password,
    }
    if(!user.name) {
      this._flashMessagesService.show('Enter your name', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }
    else if(!user.login) {
      this._flashMessagesService.show('Enter your login', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }
    else if(!user.email) {
      this._flashMessagesService.show('Enter your email', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }
    else if(!user.password) {
      this._flashMessagesService.show('Enter your password', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }
    
    this.authService.registerUser(user).subscribe( data => {
      if (!data.success) {
        this._flashMessagesService.show(data.msg, 
        { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/reg'])
      } else {
        this._flashMessagesService.show(data.msg, 
          { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/auth'])
      }
    })
    
    
  }

}
