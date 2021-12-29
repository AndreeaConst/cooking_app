import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less']
})
export class ProfilePageComponent implements OnInit {
   user!:User;
   constructor(private localStorage:LocalStorageService) { this.user = this.localStorage.retrieve('user'); }

  ngOnInit(): void {
  }

}
