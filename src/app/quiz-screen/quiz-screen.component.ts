import { Component, OnInit } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import {Quiz} from './quiz'
import {environment} from 'src/environments/environment'

@Component({
  selector: 'app-quiz-screen',
  templateUrl: './quiz-screen.component.html',
  styleUrls: ['./quiz-screen.component.css']
})
export class QuizScreenComponent implements OnInit {
  quizzes:any=[];
  quiz:any;
  userid:any;

  quizform:FormGroup=new FormGroup({});
  constructor(private fb: FormBuilder, private router:Router,private SubmitQuiz:AppService,private service:AppService, private _Activatedroute:ActivatedRoute) { 
    this.userid=(Number)(this.service.getCurrentUser());
  }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => { 
      
      
      this.service.GetQuiz(params.get('id')).subscribe((response:any)=>{
        this.quizzes.push(response);
        console.log(this.quizzes[0])
        const obj = new Quiz(this.fb,this.quizzes[0]);
        this.quiz = obj.quizzes[0];
        this.quizform = obj.quizform;
      });
      
      this.service.Warn(params.get('id'),this.userid).subscribe((response:any)=>{
        if(response){
          // console.log(this.quizform, this.quiz);
        }
        else{
          this.router.navigate(['/warn']);
        }
      })

    });
    console.log(this.quizform.value);
  }
  n = 0;
  l = 0;
  currentQuestion = 0;
  img: string = "assets/images/allTheBest.jpg";


  attempted = this.fb.group({
    userId: new FormControl(''),
    quizId: new FormControl(''),
    questionforms: this.fb.array([
      this.fb.group(
        {
          questionId: new FormControl(''),
          ansId: new FormControl(''),
          result: new FormControl('')
        })
    ])
  })

  // lnt = this.quiz.questionforms.length;
  increment() {
    this.l = this.quiz.questionforms.length;
    if (this.n == this.l - 1) {
      this.n = this.l - 1;
    }
    else {
      this.n += 1;
    }
    console.log(this.questions.controls[this.n].value);
  }
  decrement() {
    if (this.n == 0) {
      this.n = 0;
    }
    else {
      this.n -= 1;
    }
  }

  getarray(num: number) {
    return new Array(num);
  }
  onClick(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    this.n = parseInt(event.target.id);
  }

  onChangeCheckBox(event: any,quizId:any,questionId:any) {
    const ansId = event.target.value
    if(event.target.checked){
      this.questions.value.forEach((ques:any) => {
        if(ques.questionId==questionId){
          ques.answers.forEach((element:any) => {
            if(element.ansId==ansId){
              element.useransText=ansId;
            }
          });
        }
      });
    }
    else{
      this.questions.value.forEach((ques:any) => {
        if(ques.questionId==questionId){
          ques.answers.forEach((element:any) => {
            if(element.ansId==ansId){
              element.useransText="";
            }
          });
        }
      });
    }
  }

  onRadioButtonChange(event: any,quizId:any,questionId:any){
    const ansId = event.target.value
    if(event.target.checked){
      this.questions.value.forEach((ques:any) => {
        if(ques.questionId==questionId){
          ques.answers.forEach((element:any) => {
            if(element.ansId==ansId){
              element.useransText=ansId;
            }
            else{
              element.useransText='';
            }
          });
        }
      });
    }
    else{
      this.questions.value.forEach((ques:any) => {
        if(ques.questionId==questionId){
          ques.answers.forEach((element:any) => {
            if(element.ansId==ansId){
              element.useransText="";
            }
          });
        }
      });
    }
  }

  ChangeText(event: any,quizId:any,questionId:any,ansId:any){
    const ansValue = event.target.value
    this.questions.value.forEach((ques:any) => {
      if(ques.questionId==questionId){
        ques.answers.forEach((element:any) => {
          if(element.ansId==ansId){
            element.useransText=ansValue;
          }
        });
      }
    });
    
  }

  
  // Logic for building a form builder from the current quiz data.
  
  get questions() {
    return this.quizform.get('questionforms') as FormArray;
  }
  get questionforms() {
    return this.quizform.get('questionforms') as FormArray;
  }

  get answers() {
    return this.questions.get('answers') as FormArray;
  }
  
  submitQuiz(){
   this.SubmitQuiz.SubmitQuiz(this.quizform.value).subscribe((response:any)=>{
      const navigationExtras: NavigationExtras = {state: {data: response,ques:this.questionforms.length}};
      this.router.navigate(['/quiz-attempt/success'], navigationExtras);
      console.log(response,this.quizform.value);
    });
  }
  



}
