import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SailsService } from "angular2-sails";
import { ShopService } from '../../services/shop.service';
import { AgmCoreModule } from '@agm/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';


import { Shop } from '../../models/shop';

// const URL = '/api/';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  marker = { latitude: 33.8869, longitude: 9.5375, label: 's', draggable: true }
  filterQuery = "";
  rowsOnPage = 3;
  shops: Array<Shop> = [];
  newShop: Shop = new Shop();
  selectedShop: Shop = new Shop();
  allowedFileType: any = ['xls', 'xlsx'];
  importResponse: Array<any> = [];

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:1337/api',
    itemAlias: 'photo',
    allowedFileType: this.allowedFileType
  });

  constructor(private _sailsService: SailsService, private _shopService: ShopService) {
    this._sailsService.get("/shop").subscribe(
      value => {
        console.log(value);
        this.shops = value.data.reverse();
      },
      error => { console.log(error) }
    );
    this._sailsService.on("shop").subscribe(
      event => { this.handleShopEvent(event) },
      error => { console.log(error) }
    );
  }

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      this.importResponse = JSON.parse(response);
    };
  }
  import() {
    this.importResponse.forEach(element => {
      this.newShop.first_name=element.first_name;
      this.newShop.last_name=element.last_name;
      this.newShop.code=element.code;
      this.newShop.address=element.address;
      this.newShop.city=element.city;
      this.newShop.province=element.province;
      this._shopService.addShop(this.newShop)
      .subscribe(
      (data) => { console.log(data) },
      (error) => { console.log(error) }
      );
    });
    this.newShop = new Shop();
  }
  mapClicked($event) {
    this.marker.latitude = $event.coords.lat;
    this.marker.longitude = $event.coords.lng;
    console.log('marker', $event.coords.lat, $event.coords.lng);
  }
  dragged($event) {
    this.marker.latitude = $event.coords.lat;
    this.marker.longitude = $event.coords.lng;
    console.log('position', $event.coords.lat, $event.coords.lng);
  }
  saveShop() {
    this._shopService.addShop(this.newShop)
      .subscribe(
      (data) => { console.log(data) },
      (error) => { console.log(error) }
      );
    this.newShop = new Shop();
  }
  editShop() {
    var id = this.selectedShop.id;
    this._shopService.editShop(id, this.selectedShop)
      .subscribe(
      (data) => { console.log(data) },
      (error) => { console.log(error) }
      )
  }
  editShopPosition() {
    var id = this.selectedShop.id;
    this.selectedShop.place = { latitude: this.marker.latitude, longitude: this.marker.longitude }
    this._shopService.editShop(id, this.selectedShop)
      .subscribe(
      (data) => { console.log(data) },
      (error) => { console.log(error) }
      )
  }
  deleteShop() {
    var id = this.selectedShop.id;
    this._shopService.deleteShop(id)
      .subscribe(
      (data) => { console.log(data) },
      (error) => { console.log(error) }
      )
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
}
