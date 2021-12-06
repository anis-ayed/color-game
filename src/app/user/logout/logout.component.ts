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
  public loading: boolean = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  logout():void {
    this.loading = true;
    this.userService.logout().pipe(takeUntil(this._isDead$)).subscribe(
      response => {
        if (response) {
          this.router.navigate([''])
          this.loading = false;
        }
      }
    )
  }
  ngOnDestroy(): void {
    // @ts-ignore
    this._isDead$.next();
  }
}
