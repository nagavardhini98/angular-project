import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questioncreator',
  templateUrl: './questioncreator.component.html',
  styleUrls: ['./questioncreator.component.css']
})
export class QuestioncreatorComponent implements OnInit {
  public model = {
    header: 'Full Size Modal'
  };
  

  answertypes: any = [
    { value: 'text', text: 'Text' },
    { value: 'choice', text: 'Multiple-Answer Choices' },
    { value: 'radio', text: 'Single-Answer Choice' },
  ]

  index: any;
  constructor(private fb: FormBuilder) {

    this.index = 0;
  }
  ngOnInit(): void {
  }

  get answers() {
    // console.log('From answers' + this.index)
    return this.questionform.get('answers') as FormArray;
  }


  questionform = this.fb.group(
    {
      question: new FormControl(''),
      answertype: new FormControl(''),
      answers: this.fb.array([
        new FormGroup({
          ansText: new FormControl(''),
          useransText: new FormControl(''),
          iscorrect: new FormControl(false)
        })
      ])
    })
  
  
  // Adding Question to Quiz
  addQuestion() {
    console.warn(JSON.stringify(this.questionform.value));
  }

  // Adding a choice for Question
  addChoice() {
    const answer = new FormGroup({
      ansText: new FormControl(''),
      iscorrect: new FormControl(false)
    })
    this.answers.push(answer);
  }
  // Removing a choice from Question
  removeChoice(optid:number){
    this.answers.removeAt(optid);
  }

  onChange(e: SohoDropDownEvent) {
    console.log(`change ${e.target}`);
  }
  
  onChangeCheckBox(event:any){
    if(this.questionform.value.answertype=='radio'){
      let checkedcount=0;
      this.answers.controls.forEach((an:any) => {
          if(an.value.iscorrect==true)
            checkedcount+=1

      });
      console.warn(checkedcount);
      if(checkedcount>1){
        event.target.checked=false;
        this.answers.at(event.target.id).value.iscorrect=false;
        alert('For single answer choices only one correct answer exists!!!.')
      }
    }
    
  }


}
