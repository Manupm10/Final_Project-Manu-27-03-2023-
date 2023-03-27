// import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postDetails(data:any){
    return this.http.post("http://localhost:3000/employees/",data);

  }
  postDetailsId(data:any,id:number){
    return this.http.post("http://localhost:3000/employees/"+id,data);

  }
  getDetails(){
    return this.http.get("http://localhost:3000/employees");

  }
  getDetailsId(id:any){
    return this.http.get("http://localhost:3000/employees/"+id);

  }
  updateDetails(data:any,id:number){
    return this.http.put("http://localhost:3000/employees/"+id,data);
  }

  patchDetails(data:any,id:number){
    return this.http.patch("http://localhost:3000/employees/"+id,data);
  }
  deleteDetails(id:number){
    return this.http.delete("http://localhost:3000/employees/"+id);
  }
  deleteDetailsId(data:any,id:number){
    return this.http.delete("http://localhost:3000/employees/"+id,data);
  }
}
