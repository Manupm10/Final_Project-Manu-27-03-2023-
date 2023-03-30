import { Router } from '@angular/router';
import { ApiService } from './../../../api.service';
import { Component, OnInit } from '@angular/core';
import { Chart} from 'node_modules/chart.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  gaugemap: any = {};
  public empData= {
    id : 0,
    firstName:'',
    lastName:'',
    password:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    image:'',
    experience:0,
    leave:'',
  };
  constructor(private api:ApiService,private router:Router,private datePipe:DatePipe){}
  searchString!:string;
  empdata:any;
  chartdata:any;
  needleValue:any;
  labeldata:any[]=[];
  realdata:any[]=[];
  dolabeldata:any[]=[];
  dorealdata:any[]=[];
  dorealdata2:any[]=[];
  galabeldata:any[]=[];
  garealdata:any[]=[];
  user1:any= [  ];
  total:any;
  empNo:any;
  ngOnInit(): void {
    this.api.getDetails().subscribe(res=>{
      this.empdata=res;
      this.leavecount();
    })
   
    this.api.getDetails().subscribe(res=>{
      this.chartdata=res;
      this.empNo=this.chartdata.length;
      if(this.chartdata!=null){
        for(let i=0;i<this.chartdata.length;i++){
          // console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].firstName);
          this.realdata.push(this.chartdata[i].leave);
          this.dorealdata2.push(this.chartdata[i].previousweekLeave);
        }
        this.BarChart(this.labeldata,this.realdata,this.dorealdata2,'bar','barchart');
       
      }
    });
    this.getDoughnut();
  
  }
  BarChart(labeldata:any,realdata:any,dorealdata2:any,type:any,id:any){
    const ctx = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: '# of Total Leave Taken ',
          data: realdata,
          backgroundColor:[
            'rgba(176, 11, 11,0.8)',
          ],
          borderWidth: 1,
          hoverOffset: 4
        },
        {
          label: '# of Leave Taken Past week',
          data: dorealdata2,
          backgroundColor:[
            'rgba(6, 67, 209,0.8)',
          ],
          borderWidth: 1,
          hoverOffset: 4
        }]
      },
    });

   
  }

  online=0;
  offline=0;
  getDoughnut(){
    this.api.getDetails().subscribe(res=>{
      this.chartdata=res;
      // console.log(this.chartdata.length);
      // if(this.chartdata!=null){
        for(let i=0;i<this.chartdata.length;i++){
          if(this.chartdata[i].status=="Active"){
            this.online=this.online+1;
            // console.log(this.online);
          }else{
            this.offline=this.offline+1;
        
          }
      }
      this.dolabeldata.push('Active','Inactive');
      console.log(this.online);
      console.log(this.offline);
      this.DoughnutChart(this.dolabeldata, 'doughnut','dochart');
    });
  }

  DoughnutChart(dolabeldata:any, type:any,id:any){
    const ctx = new Chart(id, {
      type: type,
      data: {
        labels: dolabeldata,
        datasets: [{
          label: '# of status',
          data: [this.online,this.offline],
          backgroundColor:[
            'rgba(5, 153, 42,0.8)',
            'rgba(123, 128, 122,0.8)',
          ],
          borderWidth: 1,
          hoverOffset: 4
        }]
      },
    });
  }

  onClick(){
    this.api.getDetails().subscribe(res=>{
      this.user1=res;
      for(let i=0;i<this.user1.length;i++){
        this.router.navigate(['./employee',this.user1[i].id]);
      }
    })
  }

  today= new Date();
  leavecount(){
let current_week = this.datePipe.transform(this.today,'w')
    console.log('month', current_week);
    for(let i=0;i<this.empdata.length;i++){
      console.log('previousweek',this.empdata[i].previousweek);
      if( current_week!=this.empdata[i].previousweek){
        console.log('previousmonthleave',this.empdata[i].previousweekLeave);
        console.log('currentmonthleave',this.empdata[i].currentweekleave);
        this.empdata[i].previousweekLeave+=this.empdata[i].currentweekleave;
        this.empdata[i].currentweekleave=0;
        this.empdata[i].previousweek= current_week;
        console.log('i',i);
        this.api.patchDetails(this.empdata[i],this.empdata[i].id).subscribe(res=>{
          
        })
        // console.log('previousmonth',this.empdata[i].currentmonthleave);
        
      }
    }
    console.log('leavecount',this.empdata);
  }
   
}
