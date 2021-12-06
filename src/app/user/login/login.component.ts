import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {UserService} from "../user-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMsg: string = '';
  private _isDead$ = new Subject();
  constructor(private userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  ngOnInit(): void {
  }
  login(): void {
    this.userService.login(this.loginForm.value).pipe(takeUntil(this._isDead$)).subscribe(
      (user: any) => {
        if(!!user) {
          console.log(user);
          this.router.navigate([''])
        }
      }, error => {
        this.errorMsg = error.message
      })
  }
  ngOnDestroy(): void {
    // @ts-ignore
    this._isDead$.next();
  }
}
