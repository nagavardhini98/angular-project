import { FormArray, FormBuilder, FormControl } from "@angular/forms";
import { environment } from "src/environments/environment";
import { AppService } from "../app.service";
import { Answer } from "./answer";
import { Question } from './question';
import { QuizScreenComponent } from './quiz-screen.component';

export class Quiz {
    quizzes:any=[];
    constructor(private fb: FormBuilder, private quiz1:any) {
        // this.quiz = this.quiz1;
        // console.log(this.quiz)
        this.quizzes.push(this.quiz1);
        this.getQuestionForms();
    }
    get questions() {
        return this.quizform.get('questionforms') as FormArray;
    }


    quiz5 ={
        "userId": 1,
        "quizId": 2,
        "quizName": "JS Quizzie",
        "quizDesc": "Its a quiz for testing the knowledge of js",
        "quizSubject": "Just a small js test",
        "questionsCount": 4,
        "isActive": false,
        "questionforms": [
            {
                "questionId": 1,
                "question": "Function to remove an element",
                "answertype": "radio",
                "answers": [
                    {
                        "ansId": 1,
                        "ansText": "splice",
                        "iscorrect": true
                    },
                    {
                        "ansId": 2,
                        "ansText": "slice",
                        "iscorrect": false
                    }
                ]
            },
            {
                "questionId": 2,
                "question": "Whats the output?",
                "answertype": "text",
                "answers": [
                    {
                        "ansId": 3,
                        "ansText": "hii",
                        "iscorrect": false
                    }
                ]
            },
            {
                "questionId": 3,
                "question": "Function to remove an element in js",
                "answertype": "radio",
                "answers": [
                    {
                        "ansId": 4,
                        "ansText": "Splice",
                        "iscorrect": true
                    },
                    {
                        "ansId": 5,
                        "ansText": "Slice",
                        "iscorrect": false
                    }
                ]
            },
            {
                "questionId": 4,
                "question": "Function to remove an element from an array?",
                "answertype": "choice",
                "answers": [
                    {
                        "ansId": 6,
                        "ansText": "removeAt",
                        "iscorrect": true
                    },
                    {
                        "ansId": 7,
                        "ansText": "delete",
                        "iscorrect": false
                    },
                    {
                        "ansId": 8,
                        "ansText": "pop",
                        "iscorrect": true
                    },
                    {
                        "ansId": 9,
                        "ansText": "remove",
                        "iscorrect": false
                    }
                ]
            }
        ]
    }
        
    currentQuiz =  this.quiz1;
    quizform = this.fb.group(
        {
            userId: new FormControl(environment.user),
            quizId: new FormControl(this.currentQuiz.quizId),
            quizName: new FormControl(this.currentQuiz.quizName),
            quizSubject: new FormControl(this.currentQuiz.quizSubject),
            quizDesc: new FormControl(this.currentQuiz.quizDesc),
            isActive: new FormControl(this.currentQuiz.isActive),
            questionforms: this.fb.array([
                {
                    questionId: new FormControl(''),
                    question: new FormControl(''),
                    answertype: new FormControl(''),
                    answers: this.fb.array([
            
                    ])
                }
            ])
            
        });

    getQuestionForms() {
        this.currentQuiz.questionforms.forEach((que_form:any) => {

            const question = new Question(this.fb, que_form);
            const questionform = question.questionform;

            que_form.answers.forEach((ans_form:any) => {
                const answer = new Answer(this.fb, ans_form);
                const answerform = answer.answerform;
                question.answers.push(answerform);
            })
            // this.questions.removeAt(0);
            this.questions.push(questionform);
        })
        for(let i=0;i<this.questions.length;i++){
            // console.log(this.questions.value[i])
            if(this.questions.value[0].questionId.value==''){
                this.questions.removeAt(i);
            }
        }
        // console.log(this.questions);
    }
}