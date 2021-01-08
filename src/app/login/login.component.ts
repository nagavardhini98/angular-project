import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private appService: AppService, private http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
  }
  user: string = ""
  pass: string = ""
  msg: string = "error"
  users:any=[];
  validate() {
    if (this.user == '' || this.pass == '') {
      alert("Please enter username and password")
    }
    else {
      const _this=this;
      this.http.get(environment.java_url+"/getUser/" + this.user + "/" + this.pass).subscribe(
        data => {

          console.log(data), 
        this.http.get(environment.dot_net_url+"/api/User?username="+this.user).subscribe(
          (response:any)=>{
            console.log(response);
            // console.log(this.users);
            // this.users.push(response);
            // console.log(this.users);
              localStorage.setItem('currentUser',response);
              this._router.navigate(['/home'])
          }
        )
          //environment.user=data.
          
          
        }, error => {
          console.log(Error), this.msg = "Please Provide Valid Credentials", alert(this.msg)

        }

      )

    }
  }



}
