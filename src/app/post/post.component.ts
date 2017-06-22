import { Component, OnInit } from '@angular/core';
import { PostService } from "../services/post.service";
import { ActivatedRoute } from "@angular/router";
import { Post } from "../models/post.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postModel : Post;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    let postId = this.route.snapshot.params['id'];
    this.postService.getPost(postId).subscribe(
        res => {
          this.postModel = res.json();
        },
        error => {
          console.log(error);
        }
    )
  }

}
