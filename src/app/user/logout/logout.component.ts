import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModule} from "../user.module";
import {UserService} from "../user-service.service";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {
  private _isDead$ = new Subject();
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  logout():void {
    this.userService.logout().pipe(takeUntil(this._isDead$)).subscribe(
      response => {
        if (response) {
          this.router.navigate([''])
        }
      }
    )
  }
  ngOnDestroy(): void {
    // @ts-ignore
    this._isDead$.next();
  }
}
