import {Directive, ElementRef} from '@angular/core';
import {UserService} from "../../user/user-service.service";
import {User} from "../../user/models/user";

@Directive({
  selector: '[appIfNoUserDirective]'
})
export class IfNoUserDirectiveDirective {

  constructor(private userService: UserService, private el: ElementRef) {
    this.userService.user$.subscribe(user => this.update(user));
  }
  protected update(user: User | null): void {
    if(!user) this.el.nativeElement.className = '';
    if(user) this.el.nativeElement.className='d-none';
  }

}
