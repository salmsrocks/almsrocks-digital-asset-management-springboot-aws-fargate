import { Component, Input ,ViewEncapsulation, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { RestApiService } from "src/app/shared/rest-api.service";
import{AvailDataService} from '../../shared/services/avail-data.service';
@Component({
    selector: 'app-bs-element',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    animations: [routerTransition()],
    encapsulation: ViewEncapsulation.None
})
export class AdminComponent  implements OnInit{
    public minDate: Date = new Date ("01/01/2000");
    public maxDate: Date = new Date ("01/01/2027");
    public placeholder: string = "Choose a Date";
    randomNumVal:number;
    data
    role
    mediaParticipantType: string;
    @Input() adminDetails = { participant:'', id:'', username: ''     }

    
    constructor(public restApi: RestApiService, public router: Router,private availDataService: AvailDataService) 
    {
    //  this.randomNumVal=Math.floor(1000 + Math.random() * 9000);
    }
    
    ngOnInit() {

      this.availDataService.getAvailData().subscribe(res => {
        debugger;
        this.data=res;
        
this.data.forEach(element => {
  
    this.role=element.role;
});
    },
   
 
      );
      
  } 

  addParticipant() 
  {
    debugger;
   this.adminDetails.id= "p"+Date.now().toString();
   this.adminDetails.participant = this.mediaParticipantType;
   this.adminDetails.participant='';
   var test = JSON.stringify( this.adminDetails);
  
    this.restApi.createParticipant(this.adminDetails,this.mediaParticipantType).subscribe((data: {}) => {
     // this.router.navigate(['/dashboard'])
     this.adminDetails.username=''; 
     this.mediaParticipantType= '';                                  
     alert("Participant added successfully");
    }) 
   // console.log(this.adminDetails);
   
  }

} 