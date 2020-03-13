import { Component,  OnInit, Input  } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { RestApiService } from "src/app/shared/rest-api.service";


@Component({
    selector: 'app-programdashboard',
    templateUrl: './programdashboard.component.html',
    styleUrls: ['./programdashboard.component.scss'],
    animations: [routerTransition()],
     
   
})
export class ProgramDashboardComponent implements  OnInit {
  Programs: any = [];
 
  @Input() updateStatus = { deal: {}, currentDealStatus: ''}

  constructor(private router: Router, public restApi: RestApiService) { }

 
 ngOnInit()
 {
  this.loadPrograms()
 } 
 loadPrograms() 
 {
  return this.restApi.getPrograms().subscribe((data: {}) => {
    this.Programs = data;
  })
 } 

 


// Delete employee
deleteProgram(programid) {
  debugger;
 
  //if (window.confirm('Are you sure, you want to delete?')){
    this.restApi.deleteProgram(programid).subscribe(data => {
      this.loadPrograms()
    })
  //}
}  

}
   
    