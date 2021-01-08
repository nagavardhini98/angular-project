import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {AppService} from '../app.service'
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-myquizzes',
  templateUrl: './myquizzes.component.html',
  styleUrls: ['./myquizzes.component.css']
})
export class MyQuizzesComponent implements OnInit {

  userid:any;

  constructor(private router:Router,private userQuizapi:AppService, private http:HttpClient) { 
    this.userid=(Number)(userQuizapi.getCurrentUser());

    console.log(this.userid);
  }

 // userid = environment.user;
 
  quizzes:Array<any>=[];

  ngOnInit(): void {
    // console.log(this.quizzes)
    // if(this.userid==''){
    //   this.router.navigate(['/']);
    // }
    this.userQuizapi.getUserQuizzes(this.userid).subscribe((response:any)=>{
      response.forEach((obj:any) => {
        this.quizzes.push(obj);
      });
    });
  }



  // quizzes = JSON.parse(JSON.stringify([
  //   {
  //     "userid": "1",
  //     "isActive":false,
  //     "quizId": "1",
  //     "quizName": "Javascript Quizzie",
  //     "quizSubject": "Just a small js test",
  //     "quizDesc": "Its a quiz for testing the knowledge of js",
  //     "questionforms": [
  //       {
  //         "questionId": 1,
  //         "question": "Function to remove an element",
  //         "answertype": "radio",
  //         "answers": [
  //           {
  //             "ansId": 1,
  //             "ansText": "splice",
  //             "iscorrect": true
  //           },
  //           {
  //             "ansId": 2,
  //             "ansText": "slice",
  //             "iscorrect": false
  //           }
  //         ]
  //       },
  //       {
  //         "questionId": 2,
  //         "question": "Whats the output?  function(){ console.log('hii')}",
  //         "answertype": "text",
  //         "answers": [
  //           {
  //             "ansId": 1,
  //             "ansText": "hii",
  //             "iscorrect": false
  //           }
  //         ]
  //       },
  //       {
  //         "questionId": 3,
  //         "question": "Function to remove an element in js",
  //         "answertype": "radio",
  //         "answers": [
  //           {
  //             "ansId": 1,
  //             "ansText": "Splice",
  //             "iscorrect": true
  //           },
  //           {
  //             "ansId": 2,
  //             "ansText": "Slice",
  //             "iscorrect": false
  //           }
  //         ]
  //       },
  //       {
  //         "questionId": 4,
  //         "question": "Function to remove an element from an array?",
  //         "answertype": "choice",
  //         "answers": [
  //           {
  //             "ansId": 1,
  //             "ansText": "removeAt",
  //             "iscorrect": true
  //           },
  //           {
  //             "ansId": 2,
  //             "ansText": "delete",
  //             "iscorrect": false
  //           },
  //           {
  //             "ansId": 3,
  //             "ansText": "pop",
  //             "iscorrect": true
  //           },
  //           {
  //             "ansId": 4,
  //             "ansText": "remove",
  //             "iscorrect": false
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     "userid": "1",
  //     "quizId": "2",
  //     "isActive":true,
  //     "quizName": "TypeScript Quizzie",
  //     "quizSubject": "Just a Typescript test",
  //     "quizDesc": "Its a quiz for testing the knowledge of typescript",      
  //   },
  //   {
  //     "userid": "1",
  //     "quizId": "3",
  //     "isActive":true,
  //     "quizName": "Angular Quizzie",
  //     "quizSubject": "Just a small angular test",
  //     "quizDesc": "Its a quiz for testing the knowledge of angular",
  //   }
  // ]))

  getReport(quiz:any){
    const navigationExtras: NavigationExtras = {state: {data: quiz}};
    this.router.navigate(['quiz/report'], navigationExtras);
  }

  onswitch(id:number){
    console.log(id);
    this.http.get(environment.dot_net_url+"/api/QuizEnable/"+id).subscribe((response:any)=>{
      console.log(response);
    });
  }
}