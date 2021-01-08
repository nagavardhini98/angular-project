import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {SohoButtonModule, SohoComponentsModule, SohoLocaleModule} from 'ids-enterprise-ng';

import { AppComponent } from './app.component';
import { SohoLocaleInitializerModule } from './locale/soho-locale-initializer.module';
import { HeaderComponent } from './header/header.component';
import { PersonalizeMenuComponent } from './personalize-menu/personalize-menu.component';
// Question
import { QuestioncreatorComponent } from './questioncreator/questioncreator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyQuizzesComponent } from './myquizzes/myquizzes.component';
import { QuizcreatorComponent } from './quizcreator/quizcreator.component';
import {​​​​​​​​ AppRoutingModule }​​​​​​​​ from'./app.routing.module';
import { RouterModule } from '@angular/router'
import {HomePageComponent} from './home-page/home-page.component'
import {QuizScreenComponent} from './quiz-screen/quiz-screen.component';
import {FormsModule} from '@angular/forms';
import {ColumnYAxisDemoComponent} from './chart/chart.component';
import {PieDemoComponent} from './pie/pie.demo';

// HTTP Requests
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PersonalizeMenuComponent,
    QuestioncreatorComponent,
    MyQuizzesComponent,
    QuizcreatorComponent,
    HomePageComponent,
    QuizScreenComponent,
    ColumnYAxisDemoComponent,
    PieDemoComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
      BrowserModule,
      SohoLocaleModule,
      SohoButtonModule,
      SohoLocaleInitializerModule,
      SohoComponentsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      RouterModule,
      FormsModule,
      HttpClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US'
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
