import { FormArray, FormBuilder, FormControl } from "@angular/forms";

export class Question{
    constructor(private fb:FormBuilder,private que_form:any){
      
    }
    get answers(){
        return this.questionform.get('answers') as FormArray;
    }
    questionform = this.fb.group(
      {
        questionId: new FormControl(this.que_form.questionId),
        question: new FormControl(this.que_form.question),
        answertype: new FormControl(this.que_form.answertype),
        answers: this.fb.array([

        ])
      })
   
  }