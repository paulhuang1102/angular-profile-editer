import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { Post } from "../models/post.model";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {};
  posts = [];
  constructor(private userService: UserService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getProfile();
    }

  }

  getProfile() {
    if (localStorage.getItem('currentUser')) {
      let userId = JSON.parse(localStorage.getItem('currentUser'))['id'];
      this.userService.getUser(userId).subscribe(
          data => {
            this.user = data;
            this.posts = this.user['post'];
            console.log(this.user);
          },
          error => {
            console.log(error);
            localStorage.removeItem('currentUser');
            this.router.navigate(['home']);
          }
      )

    }

  }

  addPost() {
    if (this.posts.length > 10) {
      alert('too many posts!')
      return;
    }

    this.router.navigate(['new_post']);
    // let newPost = new Post();
    // newPost.user_id = this.user['id'];
    // console.log(this.user, newPost);
    // this.posts.push(newPost);

  }

}
