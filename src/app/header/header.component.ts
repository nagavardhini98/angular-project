import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.header') get isHeader() { return true; }
  @HostBinding('class.is-personalizable') get isPersonalizable() { return true; }

  constructor(private router:Router,private appService:AppService) { }

  ngOnInit() {
  }

  logout(){
    //environment.setuser(-1);
    localStorage.removeItem('currentUser');
    console.log(environment.user);
    this.router.navigate(['/']);
  }

  getCurUser(){

    const user=(Number)(localStorage.getItem('currentUser'));
    if(user==0){
      return 0;
    }
    else{
    return 1;
    }
  }

}
