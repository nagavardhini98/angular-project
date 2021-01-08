import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(public http: HttpClient, private route:Router) {

    }
    public createQuiz(data:any){
        return this.http.post(environment.java_url+"/insertquiz",data);
    }
    public getData() {
        return this.http.get("http://localhost:9090/WeatherData/fetch");
    }
    public getReportData(id:number) {
        return this.http.get(environment.dot_net_url+"/api/QuizReport/"+id);
    }
    public getAllQuizzes() {
        return this.http.get(environment.dot_net_url + "/api/HomeScreen");
    }
    public getUserQuizzes(userid: number) {
        return this.http.get(environment.dot_net_url + "/api/MyQuizzesScreen/" + userid)
    }
    // loginUser(data:any):any{
    //     return this.http.post(environment.dot_net_url,data);
    // }
    GetQuiz(quiz_id: any): any {
        return this.http.get(environment.dot_net_url + "/api/Quiz/"+quiz_id);
    }
    SubmitQuiz(data: any): any {
        return this.http.post(environment.dot_net_url+"/api/QuizAnswers",data);
    }

    Warn(id:any,id2:any){
        return this.http.get(environment.dot_net_url+"/api/Warn/?id="+id+"&id2="+id2);
    }

    getCurrentUser(){
        const user=(Number)(localStorage.getItem('currentUser'));

        if(!user){
        this.route.navigate(['/']);
        
        }
        else{
        return user;
        }
    }
}