import { FormBuilder, FormControl } from "@angular/forms";

export class Answer{
    constructor(private fb:FormBuilder,private ans_form:any){
      
    }
    answerform = this.fb.group({
        ansId: new FormControl(this.ans_form.ansId),
        useransText: new FormControl(''),
        ansText: new FormControl(this.ans_form.ansText)
    })
}