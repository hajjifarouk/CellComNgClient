import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';


import { SailsService } from "angular2-sails";
import { UserService } from '../../services/user.service';
import { ShopService } from '../../services/shop.service';
import { ProgramService } from '../../services/program.service';

import { User } from '../../models/user';
import { Program } from '../../models/program';
import { Shop } from '../../models/shop';
import { Visit } from '../../models/visit';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  users: Array<User> = [];
  shops: Array<Shop> = [];
  newUser: User = new User();
  selectedShops: Shop[] = [];
  selectedUser: User = new User();
  public date: any;
  newProgram: Program = new Program();
  programs: Program[];
  selectedProgram: Program = new Program();

  calendarOptions: Object = {
    height: 'auto',
    selectable: true,
    dayClick: (date, jsEvent, view) => this.DayClick(date, jsEvent, view),
    fixedWeekCount: false,
    defaultDate: new Date(),
    editable: false,
    eventLimit: true,
    events: []
  };

  @ViewChild('myCalendar', { read: ElementRef }) myCal: ElementRef;

  constructor(private _sailsService: SailsService, private _userService: UserService,
    private _shopService: ShopService, private _programService: ProgramService) {
    /*-----retreiving users list-------*/
    this._sailsService.get("/user").subscribe(
      value => { this.users = value.data.reverse(); },
      error => { console.log(error) });
    this._sailsService.on("user").subscribe(
      event => { this.handleUserEvent(event) },
      error => { console.log(error) });
    /*-----retreiving users list end-------*/
    /*-----retreiving shops list-------*/
    this._sailsService.get("/shop").subscribe(
      value => { this.shops = value.data.reverse(); },
      error => { console.log(error) });
    this._sailsService.on("shop").subscribe(
      event => { this.handleShopEvent(event) },
      error => { console.log(error) });
    /*-----retreiving shops list end-------*/
    /*-----retreiving program list-------*/
    this._sailsService.get("/program").subscribe(
      value => {
        console.log(value.data);
        if(value.data){
        this.programs = value.data.reverse();
        this.programs.forEach(p => {
          p.visits.forEach(s => {
            this.calendarOptions['events'].push({
              title: "[" + s.address + "," + s.city + "(" + s.province + ") ]",
              start: p.date.toString()
            });
          });
        });
        $(this.myCal.nativeElement).fullCalendar('renderEvents', this.calendarOptions['events'], true)
      }
    },
      error => { console.log(error) });
    this._sailsService.on("program").subscribe(
      event => { this.handleProgramEvent(event) },
      error => { console.log(error) });
    /*-----retreiving program list end-------*/
  }
  ngOnInit() {
  }
  DayClick(date, jsEvent, view) {
    $('#date2').text = date.format();
    this.date = date.format().toString();
    this._sailsService.get("/program/userDate/" + this.selectedUser.id + "/" + this.date).subscribe(
      value => {
        if(value.data)
        this.selectedProgram=value.data;
        else
        this.selectedProgram=new Program();
        console.log(this.selectedProgram);
      },
      error => { console.log(error) });
  }
  addProgram(prog: Program) {
    this._programService.addProgram(prog).subscribe(
      (data) => {
        data.visits.forEach(s => {
          this.calendarOptions['events'].push({
            title: "[" + s.address + "," + s.city + "(" + s.province + ") ]",
            start: data.date.toString()
          });
        });
        console.log(data)
        console.log(this.calendarOptions['events'])
        $(this.myCal.nativeElement).fullCalendar('removeEvents');
        $(this.myCal.nativeElement).fullCalendar('renderEvents', this.calendarOptions['events'], true);
      },
      (error) => { console.log(error) }
    );
    this.newProgram = new Program();
  }
  updateProgram(prog: Program) {
    this._programService.editProgram(prog.id, prog)
      .subscribe(
      (data) => {
        data.visits.forEach(s => {
          this.calendarOptions['events'].push({
            title: "[" + s.address + "," + s.city + "(" + s.province + ") ]",
            start: data.date.toString()
          });
        });
        console.log(data)
        console.log(this.calendarOptions['events'])
        $(this.myCal.nativeElement).fullCalendar('removeEvents');
        $(this.myCal.nativeElement).fullCalendar('renderEvents', this.calendarOptions['events'], true);
      },
      (error) => { console.log(error) });

  }
  add() {
    this._sailsService.get("/program/userDate/" + this.selectedUser.id + "/" + this.date).subscribe(
      value => {
        if (value.data) {
          this.selectedProgram = value.data;
          this.selectedProgram.visits = this.selectedShops.map(shp=>{
            var ev:Visit=new Visit();
            ev.address=shp.address;
            ev.city=shp.city;
            ev.code=shp.code;
            ev.first_name=shp.first_name;
            ev.last_name=shp.last_name;
            ev.province=shp.province;
            return(ev)});
          this.updateProgram(value.data);
        }
        else {
          this.newProgram.user = this.selectedUser;
          this.newProgram.visits = this.selectedShops.map(shp=>{
            var ev:Visit=new Visit();
            ev.address=shp.address;
            ev.city=shp.city;
            ev.code=shp.code;
            ev.first_name=shp.first_name;
            ev.last_name=shp.last_name;
            ev.province=shp.province;
            return(ev)});
          this.newProgram.date = this.date;
          console.log(this.newProgram)
          console.log(this.selectedShops)
          console.log(this.newProgram.visits)
          this.addProgram(this.newProgram);
        }
      },
      error => { console.log(error) });
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
  handleProgramEvent(event) {
    console.log(event);
    switch (event.verb) {
      case "created":
        this.programs.unshift(event.data);
        break;
      case "updated":
        var index = this.programs.findIndex(x => x.id === event.previous.id);
        Object.keys(event.data).forEach(element => {
          this.programs[index][element] = event.data[element];
        });
        break;
      case "destroyed":
        this.programs = this.programs.filter((u) => { return u.id !== event.previous.id })
        break;
      default:
        break;
    }
  }
  onUserChange($event) {
    this.calendarOptions["events"] = [];
    this._sailsService.get("/program/user/" + this.selectedUser.id).subscribe(
      value => {
        this.programs = value.data.reverse();
        this.programs.forEach(p => {
          p.visits.forEach(s => {
            this.calendarOptions['events'].push({
              title: "[" + s.address + "," + s.city + "(" + s.province + ") ]",
              start: p.date.toString()
            });
          });
        });
        $(this.myCal.nativeElement).fullCalendar('removeEvents');
        $(this.myCal.nativeElement).fullCalendar('renderEvents', this.calendarOptions['events'], true);
      },
      error => { console.log(error) });
  }
  onDateChange($event) {
    this._sailsService.get("/program/userDate/" + this.selectedUser.id + "/" + this.date).subscribe(
      value => {
        if(value.data)
        this.selectedProgram=value.data;
        console.log(this.selectedProgram);
      },
      error => { console.log(error) });
  }
}
