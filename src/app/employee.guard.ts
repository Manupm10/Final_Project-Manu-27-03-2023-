import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(private service:AuthenticationService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let storedData=localStorage.getItem("employee");    
      let logData   
      if(storedData!=null)
      {     
        logData= JSON.parse(storedData)  
        
      let name=logData.name;    
      let password =logData.password;    
      console.log(name);    
      console.log(password);   
      let value=this.service.getEmployee();
      if(value!==null){
        return true;
      }
      else{
       return false;      
      }
    }
    else {
      return false;
    }
  }
  
}
