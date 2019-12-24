import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { SessionService } from '../services/session.service';
import { User } from '../models/user';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false;
  user: User;

  constructor(
    private sessionSvc: SessionService,
    private userService: UserService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService
      .getUser()
      .pipe(first())
      .subscribe(user => {
        this.loading = false;
        this.user = user;
      });
  }
}
