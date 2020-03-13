import { Component, Input ,ViewEncapsulation, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { RestApiService } from "src/app/shared/rest-api.service";

@Component({
    selector: 'app-bs-element',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.scss'],
    animations: [routerTransition()],
    encapsulation: ViewEncapsulation.None
})
export class ContractComponent  implements OnInit{
    public minDate: Date = new Date ("01/01/2000");
    public maxDate: Date = new Date ("01/01/2027");
    public placeholder: string = "Choose a Date";
    randomNumVal:number;
    MediaParticipants:any=[];
    Vendors:any=[];
    Agency:any=[];
    @Input() contractDetails = {  dealId: this.randomNumVal, dealName: '', dealStatus: 'Created', agency: '', vendor: '', dealType: '', dealFromDate: '', dealToDate:'' ,
                                  createdDate: new Date().toISOString().split('T')[0], dealCurrency: '' }                              

    @Input() updateStatus = { deal: {}, currentDealStatus: '' } 
    
    
    constructor(public restApi: RestApiService, public router: Router) 
    {
    this.randomNumVal=Math.floor(1000 + Math.random() * 9000);
    }
    
    ngOnInit() {
     this.loadpartcipants();
     }
    
    
 
      loadpartcipants() 
      {
        debugger;
        this.MediaParticipants=[]; this.Agency=[]; this.Vendors=[];
      this.getMediaParticipants();     
      this.getAgencies();
       this.getVendors();
      }
      
      getMediaParticipants(){
        this.restApi.getMediaPartcipants().subscribe((data: {}) => {     
          debugger;    
          this.MediaParticipants=data;
        });
      }

      getVendors(){
        this.restApi.getVendors().subscribe((data: {}) => {      
          debugger;   
          this.Vendors=data;
        });
      }

      getAgencies(){
        this.restApi.getAgency().subscribe((data: {}) => {   
          debugger;     
          this.Agency=data;
        })
    }  


      addContract() 
      {
       debugger;
       alert(this.contractDetails.agency);
       alert(this.contractDetails.vendor);
      
        this.restApi.createContract(this.contractDetails).subscribe((data: {}) => {
         
          //this.updateContract(this.contractDetails.dealId, 'Created');
          alert("Contract created successfully");
          this.router.navigate(['/dashboard'])
       })        
       
      }

      /* updateContract(contract,status) {
        debugger;
        this.updateStatus.deal = contract;
        this.updateStatus.currentDealStatus = status;
        //if (window.confirm('Are you sure, you want to delete?')){
          this.restApi.updateContractStatus(this.updateStatus).subscribe(data => {
         
          })
        //}
      } */

      public randomNum():number
      {
        
        return this.randomNumVal;
        
      }

      VendorSelected(event) {
        debugger;
      // console.log('selected employee: ' + event);
       this.contractDetails.vendor=event;
     }

     AgencySelected(event) {
      debugger;
    // console.log('selected employee: ' + event);
     this.contractDetails.agency=event;
   }
     
}
