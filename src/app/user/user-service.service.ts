import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, skip, tap } from 'rxjs/operators';
import { Credentials } from './models/credentials';
import { User } from './models/user';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly storageKey = 'user';
  private static readonly delay = 800;
  private userSubject: BehaviorSubject<User|null>;

  constructor(private http: HttpClient) {
    const storedUser = JSON.parse(localStorage.getItem(UserService.storageKey) || 'null');
    this.userSubject = new BehaviorSubject<User|null>(storedUser);
    this.userSubject.pipe(
      skip(1), // skip first emission
      tap(user => localStorage.setItem(UserService.storageKey, JSON.stringify(user)))
    ).subscribe();
  }

  get user(): User|null {
    return this.userSubject.value;
  }

  get user$(): Observable<User|null> {
    return this.userSubject.asObservable();
  }

  login({ password, email}: Credentials): Observable<User> {
    let obs: Observable<User>;

    if (email === 'john@doe' && password === 'abcde' ){
      obs = of({
        id: '5fc62fdb5eb04def08ac913a',
        username: 'JohnDoe'
      });
    } else {
      obs = throwError(new Error('invalid credential'));
    }
    return obs.pipe(
      delay(UserService.delay), // simulate api
      tap(user => this.userSubject.next(user))
    );
  }
  loginHttp({ password, email}: Credentials): Observable<User> {
    const URL_API = 'https://jsonplaceholder.typicode.com/users?email=';
    return this.http.get<User>(URL_API + email);
  }
  changeUser(user: User | null) {
    this.userSubject.next(user)
    localStorage.setItem(UserService.storageKey, JSON.stringify(user));
  }


  logout(): Observable<boolean> {
    return of(true).pipe(
      delay(UserService.delay),
      tap(() => this.userSubject.next(null))
    );
  }
}
