import { Component, OnInit } from '@angular/core';
import { SailsService } from "angular2-sails";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

  }
 
  constructor(private _sailsService: SailsService) {
    var opts = {
      url: "http://localhost:1337",
      transports: ['polling', 'websocket']
    }
    this._sailsService.connect(opts);
  }
}
