import { Component, OnInit } from '@angular/core';
import { SailsService } from "angular2-sails";
import { UserService } from '../../services/user.service';

import { User } from '../../models/user';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  filterQuery = "";
  rowsOnPage = 5;
  title = 'app works!';
  users: Array<User> = [];
  newUser: User=new User()
  selectedUser: User =new User()

  constructor(private _sailsService: SailsService, private _userService: UserService) {
    this._sailsService.get("/user").subscribe(
      value => { this.users = value.data.reverse() ;console.log(value);},
      error => { console.log(error) }
    );
    this._sailsService.on("user").subscribe(
      event => { this.handleUserEvent(event) },
      error => { console.log(error) }
    );
  }
  ngOnInit() {
  }

  handleUserEvent(event) {
    console.log(event);
    switch (event.verb) {
      case "created":
        this.users.unshift(event.data);
        break;
      case "updated":
        var index = this.users.findIndex(x => x.id === event.previous.id);
        Object.keys(event.data).forEach(element => {
           this.users[index][element] = event.data[element];
        });
        break;
      case "destroyed":
        this.users = this.users.filter((u) => { return u.id !== event.previous.id })
        break;
      default:
        break;
    }
  }
  saveUser() {
    this._userService.addUser(this.newUser)
      .subscribe(
      (data) => { console.log(data) },
      (error) => { console.log(error) }
      );
    this.newUser=new User();
  }
  editUser() {
    var id = this.selectedUser.id;
    this._userService.editUser(id, this.selectedUser)
      .subscribe(
      (data) => { console.log(data) },
      (error) => { console.log(error) }
      )
  }
  deleteUser() {
    var id = this.selectedUser.id;
    this._userService.deleteUser(id)
      .subscribe(
      (data) => { console.log(data) },
      (error) => { console.log(error) }
      )
  }

}
