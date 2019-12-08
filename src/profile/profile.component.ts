import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import {first} from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false;
  user: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    if (!this.authenticationService.getToken()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUser().pipe(
      first()
    ).subscribe(user => {
      this.loading = false;
      this.user = user;
    });
  }
}
