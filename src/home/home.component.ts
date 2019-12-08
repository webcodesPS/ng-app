import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface Content {
  data?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = false;
  public content: Content;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.loading = true;

    this.sendGetRequest().subscribe(res => this.content = res);
  }

  sendGetRequest() {
    return this.httpClient.get(`${environment.apiUrl}`);
  }

}
