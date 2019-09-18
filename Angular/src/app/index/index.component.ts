import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Search} from '../model/Search';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  search:Search = new Search('','');

  constructor(private router: Router) { }

  ngOnInit() {


  }

  Search(specialty:NgModel,address:NgModel){

    this.router.navigate(['/listdoctors',specialty,address])
  }

  Logout(){

    localStorage.clear();
    this.router.navigate(['/'])
  }




}
