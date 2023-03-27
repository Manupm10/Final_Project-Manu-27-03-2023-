import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Chart,registerables} from 'node_modules/chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})

export class LeaveComponent {
  constructor(public activaterouter:ActivatedRoute,private api:ApiService,private router:Router,private fb:FormBuilder){}
  public empData:any= {
    id : 0,
    firstName:'',
    lastName:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    image:'',
    experience:'',
    leave:0,
  };
  leaveData1:any;
  leaveForm!:FormGroup;
  chartdata:any;
  labeldata:any[]=[];
  realdata:any[]=[];
  userId!:any; 
  user1:any=[];
  userName!:any;
  sick='sick'
  count!:any
  empjson:any;
  empstatus:any;
  ngOnInit(){
    this.leaveForm=this.fb.group({
      // full: ['', Validators.required],
      // leavedue: ['', Validators.required],
      leavetype: ['', Validators.required],
      days: ['', Validators.required],
      startDate:['', Validators.required],
      endDate:['',Validators.required],
      reason: ['', Validators.required],
    })
    
    // this.user1=this.api.postDetails(this.user1)
    // console.log('value',this.user1);
    this.getEmp();
    console.log('leavelist',this.leavelist);
    // console.log(this.empData.currentweek);
    // this.getLeave();
    // this.chart();
    
  }

  DoChart(labeldata:any,realdata:any,type:any,id:any){
    const ctx = new Chart(id, {
      type: type,
      data: {
        labels: ['Leave Taken'],
        datasets: [{
          label: '# of Total Leave Taken',
          data: [realdata,100],
          backgroundColor:[
            'rgba(38, 34, 168,0.8)',
            'rgba(123, 128, 122,0.8)',
          ],
          borderWidth: 1,
          hoverOffset: 4
        }]
      },
    });

   
  }

  leavelist:any=[];
  Postleave(){
    this.empData.leavelist.push(this.leaveForm.value);
    console.log(this.empData.leavelist);
    let leaveObject={
      leavelist:this.empData.leavelist
    }
    console.log('object',leaveObject);
    console.log('leavelist',this.empData.leavelist);
    localStorage.setItem('employee',JSON.stringify(this.empData));
    this.api.patchDetails(leaveObject,this.empData.id).subscribe(res=>{
    console.log('post',this.empData.leavelist);
    // this.getEmp();
    // this.leavelist.push(this.empData.leaveData);
      // alert("Successfully Applied");
      // this.leaveForm.reset();
    })
    
  }
  deleteRow(x:any){
    let delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.leavelist.splice(x, 1 );
    }   
  } 

  Onleave(){
    let input = this.leaveForm.value.days;
    localStorage.setItem('employee',JSON.stringify(this.empData));
    this.empData.leave=this.empData.leave + input;
    this.empData.currentmonthleave = this.empData.currentmonthleave + input;
    console.log(this.empData.leave,this.empData.currentmonthleave);
    let leaveApply = {
      leave:this.empData.leave,
      currentmonthleave:this.empData.currentmonthleave
      }
    this.api.patchDetails(leaveApply,this.empData.id).subscribe(res=>{
      this.empData=res;
      console.log(res);
    })
    this.Postleave();
    alert('Successfully Applied');
    let ref = document.getElementById('cancel')
    ref?.click();
    // this.getLeave();
    // this.leaveData1=this.leaveData;
    this.leaveForm.reset();
    this.getEmp();
  }



  getEmp(){
    this.empjson=localStorage.getItem('employee');
    if(this.empjson!=null)
    this.empData=JSON.parse(this.empjson)
    console.log(this.empData);
    this.leavelist=this.empData.leavelist;
    this.empstatus='Active'
    this.empData.status=this.empstatus;
    localStorage.setItem('employee',JSON.stringify(this.empData));
    this.api.getDetailsId(this.empData.id).subscribe(res=>{
      if(this.empData!=null){
        // console.log(this.chartdata[i]);
        this.labeldata.push('Leave Taken'+this.empData.firstName);
        this.realdata.push(this.empData.leave);
      this.DoChart(this.labeldata,this.realdata,'doughnut','dochart');
    }
    })
  }

  logout(){
    this.empstatus='Inactive'
    this.empData.status=this.empstatus;
    localStorage.setItem('employee',JSON.stringify(this.empData));
    this.api.patchDetails(this.empData,this.empData.id).subscribe(res=>{
      this.empData=res;
    })
    console.log(this.empData.status);
  }

  empNav(){
        this.router.navigate(['./employee']);
    // })
  }

}
