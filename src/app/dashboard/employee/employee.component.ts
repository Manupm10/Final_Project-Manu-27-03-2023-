import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from './../../authentication.service';
import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  @ViewChild('fileInput') fileInput: any;
  constructor(private service:AuthenticationService,private api:ApiService,public activaterouter:ActivatedRoute,private fb:FormBuilder,
    private router:Router){}

  // user1:any = {
  //   name:'',
  //   password:''
  // };

  public empData:any= {
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
    experience:0,
    // leave:0,
  };

  employee:any = {
    name:'',
    password:''
  };
  
  showPassword:boolean=true;
  changetype:boolean=true;
  empForm!: FormGroup;
  userId!:any; 
   userName!:any;
  user1:any=[];
  empstatus:any;
  isChecked!:boolean;
  value:any;
  clicked:boolean=true;
  gender='gender';
  bloodgroup='bloodgroup';
  pwd='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
  phoneno="[0-9 ]{10}";
  ngOnInit() {
    this.empForm=this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email:['', Validators.required],
      password:['',[Validators.required,Validators.pattern(this.pwd)]],
      conpassword:['', [Validators.required, Validators.pattern(this.pwd)]],
      dob: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required,Validators.pattern(this.phoneno)]],
      bloodgroup: ['', Validators.required],
      experience: ['', Validators.required],
    },{
      validators:this.Mustmatch('password','conpassword')
    })
    this.employee=this.service.getEmployee2();
    console.log('value',this.employee);
    this.getEmp();
  }

  getEmp(){
    let empjson=localStorage.getItem('employee');
    if(empjson!=null)
    this.empData=JSON.parse(empjson)
    console.log(this.empData);
    this.empstatus='Active'
    this.empData.status=this.empstatus;
    localStorage.setItem('employee',JSON.stringify(this.empData));
    this.api.patchDetails(this.empData,this.empData.id).subscribe(res=>{
      this.empData=res;
      console.log(this.empData.status);
    })
    // console.log(this.empstatus);
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

  visiblePass(){
    this.showPassword = !this.showPassword;
    this.changetype = !this.changetype;
  }

  updateEmp(){
    this.empData.firstName = this.empForm.value.firstName;
    this.empData.lastName = this.empForm.value.lastName;
    this.empData.password = this.empForm.value.password;
    this.empData.email = this.empForm.value.email;
    this.empData.dob = this.empForm.value.dob;
    this.empData.age = this.empForm.value.age;
    this.empData.gender = this.empForm.value.gender;
    this.empData.phone = this.empForm.value.phone;
    this.empData.bloodgroup = this.empForm.value.bloodgroup;
    let empname=this.fileInput.nativeElement.files[0]?.name
    if(empname!=null){
      this.empData.image= this.fileInput.nativeElement.files[0]?.name
    }
    console.log(this.empData.image);
    this.empData.experience = this.empForm.value.experience;
    // this.empData.leave = this.empForm.value.leave;
    // const fd = new FormData();
    // fd.append('image',this.file,this.file.name)
    localStorage.setItem('employee',JSON.stringify(this.empData));
    this.api.patchDetails(this.empData,this.empData.id).subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.empForm.reset();
      this.getEmp();
      // this.UploadImg();
    })
  }

  onEdit(empData:any){
    this.empForm.controls['firstName'].setValue(empData.firstName);
    this.empForm.controls['lastName'].setValue(empData.lastName);
    this.empForm.controls['password'].setValue(empData.password);
    this.empForm.controls['conpassword'].setValue(empData.password);
    this.empForm.controls['email'].setValue(empData.email);
    this.empForm.controls['dob'].setValue(empData.dob);
    this.empForm.controls['age'].setValue(empData.age);
    this.empForm.controls['gender'].setValue(empData.gender);
    this.empForm.controls['phone'].setValue(empData.phone);
    this.empForm.controls['bloodgroup'].setValue(empData.bloodgroup);
    this.fileInput.nativeElement.value = '';
    this.empForm.controls['experience'].setValue(empData.experience);
  }

  leaveNav(){
        console.log(this.empData.id);
        this.router.navigate(['./leave']);
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
