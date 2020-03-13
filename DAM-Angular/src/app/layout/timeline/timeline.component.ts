import { Component, Input ,ViewEncapsulation, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { RestApiService } from "src/app/shared/rest-api.service";
import{AvailDataService} from '../../shared/services/avail-data.service';

@Component({
    selector: 'app-bs-element',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    animations: [routerTransition()],
    encapsulation: ViewEncapsulation.None
})
export class TimelineComponent  implements OnInit{
    public minDate: Date = new Date ("01/01/2000");
    public maxDate: Date = new Date ("01/01/2027");
    public placeholder: string = "Choose a Date";
    randomNumVal:number;
    data
    role
    id
    Contract:any;
    @Input() adminDetails = {  participants: '', role: []
                                  }

    
    constructor(public restApi: RestApiService, public router: Router,private availDataService: AvailDataService) 
    {
    //  this.randomNumVal=Math.floor(1000 + Math.random() * 9000);
    }
    
    ngOnInit() {

        this.loadContracts();

//       this.availDataService.getAvailData().subscribe(res => {
//         debugger;
//         this.data=res;
        
// this.data.forEach(element => {
  
//     this.role=element.role;
// });
//     },
   
 
//       );
      
  }

  loadContracts() 
 {
     debugger;
    this.id=sessionStorage.getItem('timelineid');
    this.restApi.getHistorian().subscribe((data: {}) => {
        debugger;
      var transaction = data;    
        });
    return this.restApi.getContract(this.id).subscribe((data: {}) => {
    debugger;
    this.Contract = data;    
    });

 }

} 