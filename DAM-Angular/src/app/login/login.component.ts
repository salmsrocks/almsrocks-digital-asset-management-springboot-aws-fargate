import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import{AvailDataService} from '../shared/services/avail-data.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    public userName: string;
    pswd:any
    user
    data
    role
    model: any = {};
    public isloggedin:boolean;
    constructor(
      public router: Router,private availDataService: AvailDataService
    ) {
      this.isloggedin=false;
    }

    ngOnInit() {}

    onLoggedin() {
       
        // this.model.password=this.pswd;
      this.availDataService.getAvailData().subscribe(res => {
        debugger;
        this.data=res;
        
this.data.forEach(element => {
  if(element.user == this.userName && this.pswd== element.pass){
    this.isloggedin=true; 
    this.role=element.role;
  }
});

        // this.u1=this.data.map(item => item.user1);
        // console.log("_________:::::"+ this.u1); 
        // this.u2=this.data.map(item => item.user2);
        // console.log("_________:::::"+ this.u2);
        // this.u3=this.data.map(item => item.user3); 
        // this.p1=this.data.map(item => item.pass1);
        // this.p2=this.data.map(item => item.pass2);
        // this.p3=this.data.map(item => item.pass3);
        if(this.isloggedin){
          // if((this.userName==this.u1 || this.userName==this.u2)&&(this.pswd==this.p1 || this.pswd==this.p2)){
            sessionStorage.setItem('isLoggedin', this.userName);
            sessionStorage.setItem('Loggedinrole', this.role);
    this.router.navigateByUrl('forms');
        }
        else{
          alert("login failed")
        }
    },
    
      );
    
      return this.userName;
        // localStorage.setItem('isLoggedin', 'true');
    }
    
}
