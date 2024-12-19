import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private us: UserService, private router: Router) { }

  ngOnInit(): void {
   
  }

  logOut() {
    this.us.user = undefined;
    console.log('from header after logout', this.us.user);
    localStorage.clear();
    this.router.navigate(['login'])
  }

}
