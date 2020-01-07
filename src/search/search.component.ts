import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements  OnInit, OnDestroy {
  ids: string[];

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => this.ids = params.getAll('ids'));

    console.log(this.ids);
  }

  ngOnDestroy(): void {

  }
}
