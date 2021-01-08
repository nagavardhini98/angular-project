import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { AppService } from '../app.service';
// @ts-ignore
import { SohoPieComponent } from 'ids-enterprise-ng';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie-demo',
  templateUrl: 'pie.demo.html',
})
export class PieDemoComponent implements OnInit {

  @ViewChild(SohoPieComponent, { static: true }) sohoPieComponent?: SohoPieComponent;

  // The following multiple "private selection" definitions are all examples of ways to set the selection on the chart
  // private selection: SohoPieSelected  = {fieldName: 'name', fieldValue: 'Item D'};
  private selection: SohoPieSelected = { index: 1 };

  pieData = [{
    data: [{}]}];
  score:any;
  que_attempted:any;
  que_len:any;
  data:any;
  userid:any;
  constructor(private appService: AppService, private router:Router) { 
    this.userid=(Number)(appService.getCurrentUser());
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {data: string, ques:number};
    this.data = state.data;
    this.que_len = state.ques;
    let obj = this.data.split('##')[1]
    // {Sc:18,Qa:1}
    let obj1 = obj.split(',')
    this.score = obj1[0].split(':')[1]
    this.que_attempted = obj1[1].split(':')[1].split('}')[0]
    this.pieData = [{
      data: [{
          name: 'Correct Answers',
          value: this.score,
          id: 'quiz-correct',
          attributes: [
            { name: 'id', value: 'item-a' },
            { name: 'data-automation-id', value: 'item-a-automation-id' }
          ],
          tooltip: 'Item A <b>{{percent}}</b>'
      }, {
          name: 'Wrong Answers',
          value: this.que_len-this.score,
          id: 'quiz-wrong',
          attributes: [
            { name: 'id', value: 'item-b' },
            { name: 'data-automation-id', value: 'item-b-automation-id' }
          ],
          tooltip: 'Item B <b>{{percent}}</b>'
      }, ]
    }];
    // console.log(obj1,score,que_attempted);
  }

  ngOnInit() {
    // this.fetch()

  }

  onRendered(event: Event) {
    console.log('Soho Radar: onRender', event);
  }

  onSelected(event: Event) {
    console.log('Soho Radar: Selected', event);
  }

  onDeselected(event: Event) {
    console.log('Soho Radar: Deselected', event);
  }
  // fetch() {
  //   this.appService.getData().subscribe((response: any) => {
  //     console.log(response);
  //     let d = [{ data: response }];
  //     this.pieData = this.score;
  //   })

  // }

}