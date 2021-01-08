import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private appService: AppService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  name: string = ""
  email: string = ""
  org: string = ""
  uname: string = ""
  password: string = ""
  confirmpassword: string = ""


  doPost() {
    let data = {
      name: this.name,
      email: this.email,
      org: this.org,
      password: this.password,
      uname: this.uname
    }
    // if (this.password != this.confirmpassword) {
    //   //alert("Password Mismatch")
    // } else {
      return this.http.post(environment.java_url+"/registeruser", {
        "name": this.name, "email": this.email, "organization": this.org,
        "password": this.password, "username": this.uname
      }).subscribe(data => {
        //this.postId = data.id;
        console.log(data);
        this.router.navigate(['/login'])
      })

    
  }

}

