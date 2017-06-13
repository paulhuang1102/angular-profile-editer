import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html'
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['home'])
    }, 200)
  }

}
