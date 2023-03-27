import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router:Router,private api:ApiService) { }

  // checkUserStatus(){
  //   const user = localStorage.getItem('login');
    
 
  //   if(user){
  //     return true;
  //    }else{
  //     return false;
  //    }
  // }

  public user1= {
    name:'',
    password:'',
    };
  
   

    name:any;
    password:any;
    employee1:any=[];
  setData(value:any){
    this.user1.name=value.name;
    this.user1.password=value.password;
  }
    
  setUser(value:any){
    this.user1.name=value.firstName;
    this.user1.password=value.password;
    console.log('user1',this.user1);
    localStorage.setItem('hr',JSON.stringify(this.user1));
  }

    // getUser1(){
    //   this.name=this.user1.name;
    //   this.password=this.user1.password;
    //   console.log('name',this.user1.name);
    //   console.log('password',this.user1.password);
    //   // this.getItem
  
    //   if(this.name=='hr'&& this.password=='123'){
        
    //     return true;

    //   }else{
    //     return false;
    //   }
  
    // }
    getUser2(){
      return this.user1
    }

    // setEmployee(value:any){
    // this.user1.name=value.firstName;
    // this.user1.password=value.password;
    // console.log('employee1',this.user1);
    // localStorage.setItem('employee',JSON.stringify(this.user1));
    // }
    userId:any;
    getEmployee(){
      this.api.getDetails().subscribe(res=>{
        this.employee1=res;
        let value={
          firstName:'',
          password:'',
        }
        for(let i=0;i<this.employee1.length;i++){
          if((this.employee1[i].firstName === value.firstName) && (this.employee1[i].password === value.password))
          {
            return true;
          }
          else
          {

          return false;
          }
        }
      })
    }

    getEmployee2(){
      return this.employee1;
    }
}
