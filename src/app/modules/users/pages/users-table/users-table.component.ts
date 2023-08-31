import { Component,OnInit } from '@angular/core';
import {UsersService} from '@services/users.service';
import {AuthService} from '@services/auth.service';

import { DataSourceUser } from './data-source';
import { User } from '@models/user.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit  {

  ngOnInit(): void {
    this.usersService.getUsers()
    .subscribe(users=>{
      this.dataSource.init(users); 
    })
    this.authService.user$
    .subscribe(user=>{
      this.user=user;
    })
  }
  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user:User|null=null;

  constructor(private usersService:UsersService,
    private authService:AuthService) {
  }

}
