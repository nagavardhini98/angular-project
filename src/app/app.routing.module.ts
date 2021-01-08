import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColumnYAxisDemoComponent } from './chart/chart.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { MyQuizzesComponent } from './myquizzes/myquizzes.component';
import { PieDemoComponent } from './pie/pie.demo';
import { QuizScreenComponent } from './quiz-screen/quiz-screen.component';
import { QuizcreatorComponent } from './quizcreator/quizcreator.component';
import { RegistrationComponent } from './registration/registration.component';
import { WarningComponent } from './warning/warning.component';


const routes: Routes = [
    {path: 'home',component: HomePageComponent},
    {path: 'myquizzes',component: MyQuizzesComponent},
    {path: 'create-quiz',component: QuizcreatorComponent},
    {path: 'quiz-screen/:id',component: QuizScreenComponent},
    {path: 'quiz-attempt/success',component: PieDemoComponent},
    {path: 'quiz/report',component: ColumnYAxisDemoComponent},
    {path: 'register',component: RegistrationComponent},
    {path: 'warn',component: WarningComponent},
    {path: '',component: LoginComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{ }

