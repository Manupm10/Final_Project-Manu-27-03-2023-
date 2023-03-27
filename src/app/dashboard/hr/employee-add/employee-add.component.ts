import { ApiService } from './../../../api.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component,ViewChild } from '@angular/core';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent {
  @ViewChild('fileInput') fileInput: any;
  public empData= {
    id : 0,
    firstName:'',
    lastName:'',
    password:'',
    email:'',
    dob:'',
    age:0,
    gender:'',
    phone:0,
    bloodgroup:'',
    image:'',
    experience:'',
    leave:0,
    status:'',
    leavelist: [
      {
        "leavetype": "",
        "days": 0,
        "startDate": "",
        "endDate": "",
        "reason": ""
      }
    ]
  };

  showPassword:boolean=true;
  changetype:boolean=true; 
  bloodgroup='bloodgroup';
  gender='gender';
  empForm!: FormGroup;
  pwd='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
  phoneno="[0-9 ]{10}";
  constructor(private fb:FormBuilder,private api:ApiService){}

  ngOnInit(): void {
    this.empForm=this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.pattern(this.pwd)]],
      conpassword:['', [Validators.required, Validators.pattern(this.pwd)]],
      dob: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(this.phoneno)]],
      bloodgroup: ['', Validators.required],
      image: ['', Validators.required],
      experience: ['', Validators.required],
    },{
      validators:this.Mustmatch('password','conpassword')
    })
  }

  postEmp(){
    this.empData.firstName = this.empForm.value.firstName;
    this.empData.lastName = this.empForm.value.lastName;
    this.empData.password = this.empForm.value.password;
    this.empData.email = this.empForm.value.email;
    this.empData.dob = this.empForm.value.dob;
    this.empData.age = this.empForm.value.age;
    this.empData.gender = this.empForm.value.gender;
    this.empData.phone = this.empForm.value.phone;
    this.empData.bloodgroup = this.empForm.value.bloodgroup;
    this.empData.image= this.fileInput.nativeElement.files[0]?.name
    this.empData.experience = this.empForm.value.experience;
    this.empData.leave = 0;
    this.empData.status = 'Inactive';
    this.empData.leavelist=[];
    this.api.postDetails(this.empData).subscribe((res)=>{
      console.log(res);
      alert("Employee Added Successfully.")
      this.empForm.reset();
      // this.getEmp();
    },
    err=>{
      alert("Something Went Wrong.")
    }) 
  }

  OnFile(event:any){

  }
  visiblePass(){
    this.showPassword = !this.showPassword;
    this.changetype = !this.changetype;
  }

  Mustmatch(password:any,conpassword:any){
    
    return (formGroup:FormGroup)=>{
      const passwordcontrol=formGroup.controls[password];
      const conpasswordcontrol=formGroup.controls[conpassword];

      if(conpasswordcontrol.errors && !conpasswordcontrol.errors['Mustmatch']){
        return;
      }
      if(passwordcontrol.value!==conpasswordcontrol.value){
        conpasswordcontrol.setErrors({Mustmatch:true});
      }else{
        conpasswordcontrol.setErrors(null);
      }
    };

  }

}
