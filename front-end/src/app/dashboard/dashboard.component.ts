import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  category: string
  title: string
  photo: string
  text: string

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createPost() {
    const post = {
      category: this.category,
      title: this.title,
      photo: this.photo,
      text: this.text,
      author: JSON.parse(localStorage.getItem("user")).login,
      date: new Date()
    }
    if(!post.category) {
      this._flashMessagesService.show('Select a category', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }
    else if(!post.title) {
      this._flashMessagesService.show('Enter title', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }
    else if(!post.photo) {
      this._flashMessagesService.show('Insert a photo', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }
    else if(!post.text) {
      this._flashMessagesService.show('Enter text', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false
    }

    console.log(post)
    
    this.authService.createPost(post).subscribe( data => {
      if (!data.success) {
        this._flashMessagesService.show(data.msg, 
        { cssClass: 'alert-danger', timeout: 3000 });
      } else {
        this._flashMessagesService.show(data.msg, 
          { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/'])
      }
    })
    
    
  }

}
