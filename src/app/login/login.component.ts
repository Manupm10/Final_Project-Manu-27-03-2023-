import { AuthenticationService } from './../authentication.service';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  showPassword:boolean=true;
  changetype:boolean=true; 
  isLoggedIn:any=false;
  myForm!: FormGroup;
  hide=true;
  pwd='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
  constructor(private fb:FormBuilder,private api:ApiService,private router:Router,private service:AuthenticationService){}

  
 public hr= {
    name:'hr',
   password:'Hr@123',
   }

  

user1:any= [  ];
id:any;
// empstatus='offline';
  ngOnInit(){
    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      password:['', [Validators.required,Validators.pattern(this.pwd)]]
    });
    localStorage.removeItem('login');
    localStorage.removeItem('hr');
    localStorage.removeItem('employee');
    // this.isLoggedIn = this.service.checkUserStatus();
    // this.getDetails();
    // this.user1.status=this.empstatus;
    // this.api.patchDetails(this.user1,this.id).subscribe(res=>{
    //   this.user1=res;
    // })
  }

  // getDetails(){
  //   this.api.getDetails();
  // }

  visiblePass(){
    this.showPassword = !this.showPassword;
    this.changetype = !this.changetype;
  }


  onSubmit(form: FormGroup) {
    let login={
      name:this.myForm.value.firstName,
      password:this.myForm.value.password
    } 
    this.service.setData(login);
    localStorage.setItem('login',JSON.stringify(login));
       this.api.getDetails().subscribe(res=>{
        this.user1=res;
        for(let i=0;i<this.user1.length;i++){
          if((this.user1[i].firstName === form.value.firstName) && (this.user1[i].password === form.value.password)){
            localStorage.setItem('employee',JSON.stringify(this.user1[i]));
            this.router.navigate(['./employee']);
          }else if(form.value.firstName == 'hr'&& form.value.password == 'Hr@12345'){
            // console.log('user',this.user1)
            let user = {
              firstName:form.value.firstName,
              password:form.value.password
            }
            console.log(user.firstName)
            this.service.setUser(user);
            this.router.navigate(['./chart',]);
            break;
          }
        }
       })
       console.log(this.isLoggedIn);
    // this.user1.firstName=this.myForm.value.firstName;
    // this.user1.password=this.myForm.value.password;
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.firstName);
    console.log('Password', form.value.password);
    // this.service.setUser(this.user1);
    // this.router.navigate(['./employee']);
  }

}
