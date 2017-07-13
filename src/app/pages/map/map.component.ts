import { Component, OnInit } from '@angular/core';
import { SailsService } from "angular2-sails";
import { UserService } from '../../services/user.service';
import { ShopService } from '../../services/shop.service';
import { UserMarkerFilterPipe } from '../../pipes/user-marker-filter.pipe';
import { ShopMarkerFilterPipe } from '../../pipes/shop-marker-filter.pipe';
import { Shop } from '../../models/shop';
import { User } from '../../models/user';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  lat: number = 36.8065;
  lng: number = 10.1815;

  disp_users:Boolean=false;  
  disp_shops:Boolean=false;

  users: Array<User> = [];
  shops: Array<Shop> = [];

  constructor(private _sailsService: SailsService, private _userService: UserService, private _shopService: ShopService) {
        this._sailsService.get("/user").subscribe(
          value => { this.users = value.data.reverse() ;console.log(this.users);},
          error => { console.log(error) }
        );
        this._sailsService.on("user").subscribe(
          event => { this.handleUserEvent(event) },
          error => { console.log(error) }
        );
        this._sailsService.get("/shop").subscribe(
          value => { this.shops = value.data.reverse();console.log(this.shops)},
          error => { console.log(error) }
        );
        this._sailsService.on("shop").subscribe(
          event => {this.handleUserEvent(event) },
          error => { console.log(error) }
        );
   }

  ngOnInit() {
    /*this._sailsService.get("/user").subscribe(
          value => { this.users = value.data.reverse() ;console.log(value);},
          error => { console.log(error) }
        );
        this._sailsService.on("user").subscribe(
          event => { this.handleUserEvent(event) },
          error => { console.log(error) }
        );
        this._sailsService.get("/shop").subscribe(
          value => { this.shops = value.data.reverse();console.log(value)},
          error => { console.log(error) }
        );
        this._sailsService.on("shop").subscribe(
          event => {this.handleUserEvent(event) },
          error => { console.log(error) }
        );*/
  }
handleShopEvent(event) {
    console.log(event);
    switch (event.verb) {
      case "created":
        this.shops.unshift(event.data);
        break;
      case "updated":
        var index = this.shops.findIndex(x => x.id === event.previous.id);
        Object.keys(event.data).forEach(element => {
           this.shops[index][element] = event.data[element];
        });
        break;
      case "destroyed":
        this.shops = this.shops.filter((u) => { return u.id !== event.previous.id })
        break;
      default:
        break;
    }
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
}
