import { AuthenticationService } from './../../authentication.service';
import { ApiService } from './../../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.scss']
})
export class HrComponent implements OnInit{
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
    experience:0,
    leavelist:[{leavetype:'',
    days:0,
    startDate:'',
    endDate:'',
    reason:''}],
  };
  user:any = {
    name:'',
    password:''
  };


  showPassword:boolean=true;
  changetype:boolean=true; 
  gender='gender';
  bloodgroup='bloodgroup';
  EditImg!:'';
  file!:File;
  empData1!:any;
  empData2:any=[];
  add!:boolean;
  update!:boolean;
  empForm!: FormGroup;
  pwd='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
  phoneno="[0-9 ]{10}";
  public isDisabled = true;
  public isEnabled = false;
  public name = 'List View';
  constructor(private fb:FormBuilder,private api:ApiService,private service:AuthenticationService){}

  ngOnInit(): void {
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

    this.user=this.service.getUser2();
    console.log('value',this.user);
    this.getEmp();
    // this.checkStatus();
  }

  visiblePass(){
    this.showPassword = !this.showPassword;
    this.changetype = !this.changetype;
  }

  disable() {
    if(this.isDisabled){
      this.isDisabled = false;
      this.isEnabled = true;
      this.name = 'Grid View';
    } else {
      this.isDisabled = true;
      this.isEnabled = false;
      this.name = 'List View';
    }
  }


  leaveData:any;
  getEmp(){
    this.api.getDetails().subscribe(res=>{
      this.empData1 = res;
      console.log(this.empData1);
      // for(let i=1;i<this.empData1.length;i++)
      // {
        console.log(this.empData1[0].leavelist);
      // }
    })
    
  }

  newlist:any=this.empData
onclic(newlist:any){
  this.newlist=newlist;
}


  deleteEmp(emp : any){
    this.api.deleteDetails(emp.id).subscribe(res=>{
      console.log(res);
      alert("Employee Deleted");
      this.getEmp();
    });
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
    this.empData.image= this.fileInput.nativeElement.files[0]?.name
    this.empData.experience = this.empForm.value.experience;
    this.api.patchDetails(this.empData,this.empData.id).subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.empForm.reset();
      this.getEmp();
    })
  }

  onEdit(emp:any){
    this.empData.id = emp.id;
    this.empForm.controls['firstName'].setValue(emp.firstName);
    this.empForm.controls['lastName'].setValue(emp.lastName);
    this.empForm.controls['password'].setValue(emp.password);
    this.empForm.controls['conpassword'].setValue(emp.password);
    this.empForm.controls['email'].setValue(emp.email);
    this.empForm.controls['dob'].setValue(emp.dob);
    this.empForm.controls['age'].setValue(emp.age);
    this.empForm.controls['gender'].setValue(emp.gender);
    this.empForm.controls['phone'].setValue(emp.phone);
    this.empForm.controls['bloodgroup'].setValue(emp.bloodgroup);
    this.fileInput.nativeElement.value = '';
    this.empForm.controls['experience'].setValue(emp.experience);
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
