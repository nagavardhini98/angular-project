import { style } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  SohoModalDialogService, SohoModalDialogRef, SohoToastService
} from 'ids-enterprise-ng';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';
import { QuestioncreatorComponent } from '../questioncreator/questioncreator.component';
@Component({
  selector: 'app-quizcreator',
  templateUrl: './quizcreator.component.html',
  styleUrls: ['./quizcreator.component.css']
})
export class QuizcreatorComponent implements OnInit {
  
  questions_array: any = [
   // {
    //     "question": "Is yesh love biriyani",
    //     "answertype": "choice",
    //     "answers": [
    //         {
    //             "ansText": "Yes",
    //             "iscorrect": true
    //         },
    //         {
    //             "ansText": "No",
    //             "iscorrect": false
    //         },
    //          {
    //             "ansText": "Donno",
    //             "iscorrect": true
    //         }
    //     ]
    // },
    // {
    //     "question": "Whether delete those guys fingerprint or not",
    //     "answertype": "text",
    //     "answers": [
    //         {
    //             "ansText": "NO",
    //             "iscorrect": false
    //         }
    //     ]
    // }
  ]
  constructor(private modalService: SohoModalDialogService, private fb: FormBuilder, private toastService:SohoToastService,private service:AppService,private router:Router) { 

  }


  ngOnInit(): void {
  }

  get questions() {
    return this.quizform.get('questionforms') as FormArray;
  }

  userid=(Number)(this.service.getCurrentUser());
  quizform = this.fb.group(
    {
      userId:new FormControl(this.userid),
     
      quizName: new FormControl('',Validators.required),
      quizSubject: new FormControl('',Validators.required),
      quizDesc: new FormControl('',Validators.required),
      questionforms: this.fb.array([

      ])
    })

    removeQuestion(que_id:number){
      this.questions.removeAt(que_id);
      this.questions_array.splice(que_id,1);
      console.log(JSON.stringify(this.questions.value),this.questions_array)
    }

    
    get disableSave(): boolean {
      return (this.quizform.valid && this.quizform.dirty);
    }





  // Modal
  @ViewChild('dialogPlaceholder', { read: ViewContainerRef, static: true })
  placeholder?: ViewContainerRef;

  public closeResult = '(N/A)';
  public title = 'Add Questions Here 👇';

  openQuestionForm() {
    const dialogRef = this.modalService
      .modal<QuestioncreatorComponent>(QuestioncreatorComponent, this.placeholder, { fullsize: 'responsive' })
      .title(this.title)
      .buttons(
        [
          // {
          //   text: 'Enable', click: () => {
          //     const api = dialogRef.buttonsetAPI;
          //     if (api) {
          //       api.at(2).disabled = false;
          //       api.at(3).disabled = false;
          //     }
          //   }
          // },
          // {
          //   text: 'Disable', click: () => {
          //     const api = dialogRef.buttonsetAPI;
          //     if (api) {
          //       api.at(2).disabled = true;
          //       api.at(3).disabled = true;
          //     }
          //   }
          // },
          {
            text: 'Cancel', click: () => {
              dialogRef.close('CANCEL');
            }
          },
          {
            text: 'Add Question', click: () => {
              console.log('Entered addquestion');
              const que_form = this.fb.group(
                {
                  question: new FormControl(dialogRef.componentDialog?.questionform.value.question),
                  answertype: new FormControl(dialogRef.componentDialog?.questionform.value.answertype),
                  answers: dialogRef.componentDialog?.questionform.get('answers')
                })
              // let count = 0;
              // let error = false;
              // if (dialogRef.componentDialog?.questionform.value.answertype == 'radio') {
              //   dialogRef.componentDialog?.questionform.value.answers.forEach((ans: any) => {
              //     if (ans.iscorrect == true){
              //       console.warn(ans.ansText);
              //       count += 1
              //     }
              //   });

              //   if (count > 1)
              //     error = true
              //   else
              //     error = false
              // }

              // if (error) {
              //   alert('For single answer choices only one correct answer exists!!!')
              //   console.log(count,error);
              // }
              // else {
                console.log(dialogRef.componentDialog?.questionform.value);
                this.questions.push(que_form);
                this.questions_array.push(Object(que_form.value));
                console.warn(JSON.stringify(this.quizform.value));
                dialogRef.close('SUBMIT');
              // }
            }, isDefault: true
          }
        ])
      // .beforeOpen((ref?: SohoModalDialogRef<FullSizeModalDialogComponent>) => {
      //   (ref as any).buttonsetAPI.at(2).disabled = true;
      //   return true;
      // }).afterOpen((_: any, ref: SohoModalDialogRef<FullSizeModalDialogComponent>) => {
      //   (ref as any).buttonsetAPI.at(3).disabled = false;
      //   return true;
      // })
      .open();
  }



  onCreateQuiz(){
    if(this.quizform.invalid){
      console.warn('Please fill all the fields');
      alert('Please fill all the fields to Proceed');
      return;
    }
    else if(this.quizform.value.questionforms.length<=0){
      this.toastService.show({ draggable: true, title: 'Invalid Submit Action', message: 'Please add atleast a single question to proceed!!', position:SohoToastService.TOP_RIGHT})
      return;
    }
    else if(this.quizform.valid){
      let quiz:any=this.quizform.value;
      this.service.createQuiz(this.quizform.value).subscribe((response)=>{
        console.log(response);
        this.router.navigate(['/myquizzes']);
      });
     console.warn(JSON.stringify(this.quizform.value));
    }
    
    
  }

}
