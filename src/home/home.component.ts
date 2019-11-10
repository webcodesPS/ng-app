import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Content {
  data?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private apiUrl = 'http://127.0.0.1:8000/api';
  public content: Content;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.sendGetRequest().subscribe(res => this.content = res);
  }

  sendGetRequest() {
    return this.httpClient.get(this.apiUrl);
  }

}
