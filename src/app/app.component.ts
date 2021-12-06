import { Component } from '@angular/core';
import {UserService} from "./user/user-service.service";
import {User} from "./user/models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'color-game-app';
  user: User | null = null;
  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.user$.subscribe(user => (!!user) ? this.user = user : this.user = null)
  }
}
