import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import {Observable} from "rxjs";
import {AuthenticationService} from "../../_services/authentication.service";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  isLoggedIn : Observable<boolean>;
  @Output() public sidenavToggle = new EventEmitter();

  constructor(public  authService: AuthenticationService) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
