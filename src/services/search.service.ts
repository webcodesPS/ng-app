import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SearchService {
  // tslint:disable-next-line:variable-name
  private readonly _ids = new BehaviorSubject<any[]>([]);
  readonly ids$ = this._ids.asObservable();
  constructor(public route: ActivatedRoute) {}

  private get ids(): any[] {
    return this._ids.getValue();
  }

  private set ids(val: any[]) {
    this._ids.next(val);
  }

  addTodo(title: string) {
    this.ids = [
      ...this.ids,
      {id: this.ids.length + 1, title, isCompleted: false}
    ];
  }

  removeTodo(id: number) {
    this.ids = this.ids.filter(ids => ids.id !== id);
  }

  setCompleted(id: number) {

  }
}
