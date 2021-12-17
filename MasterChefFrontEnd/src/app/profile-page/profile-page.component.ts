import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less']
})
export class ProfilePageComponent implements OnInit {
   user!:User;
  constructor(private loginService:LoginService) {this.user=loginService.user; }

  ngOnInit(): void {
  }

}
