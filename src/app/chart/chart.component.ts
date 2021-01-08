import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
// @ts-ignore
import { SohoColumnComponent } from 'ids-enterprise-ng';
import { AppService } from '../app.service';

@Component({
  selector: 'app-column-yaxis-demo',
  templateUrl: 'chart.component.html',
})
export class ColumnYAxisDemoComponent implements OnInit {

  @ViewChild(SohoColumnComponent, { static: true }) sohoColumnComponent?: SohoColumnComponent;
  
  dataset = [{
    //Can be optionally passed in makes less sense with one: Group 1
  }];
  public columnData:any = [{
    data: [
      // {
      //   name: 'User Id',
      //   value: 100,         
      //   tooltip: 'Tooltip by Data <br> Component A <br> Information',
      //   attributes: [
      //    { name: 'id', value: 'bar-a' },
      //    { name: 'data-automation-id', value: 'automation-id-bar-a' }
      //  ]
      // }
    ]
  }];
  data:any;
  public columnType = 'column';
  userid:any;
  constructor(private appService: AppService, private router:Router) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {data: any};
    this.data = state.data;
    console.log(this.data);
    this.userid=(Number)(appService.getCurrentUser());
  }

  public yAxis?: {};

  ngOnInit() {
    this.fetchdata();
    console.log(this.data);
    this.yAxis = {
      ticks: {
        number: 5, // Tip: round max data value
        format: 'd'
      }
    };
  }
  fetchdata()
  {
    this.appService.getReportData(this.data.quizId).subscribe((response: any)=>{
      // let d1 = [{
      //   data:response
      // }];
      // this.columnData = d1;
      // console.log(this.columnData);
      // console.log(response);
      response.forEach((element:any) => {
        console.log(element)
        let obj = {
          name: 'UserId-'+element.userId.toString(),
          value: element.score,         
          tooltip: 'Tooltip by Data <br> Component A <br> Information',
          attributes: [
           { name: 'UserId-'+element.userId.toString(), value: element.score },
           { name: 'data-automation-id', value: 'automation-id-bar-a' }
         ]
        };
        this.columnData[0].data.push(obj);
        console.log(this.columnData);
      });
    })

  }
}