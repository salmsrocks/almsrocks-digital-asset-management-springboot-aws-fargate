import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { RestApiService } from "src/app/shared/rest-api.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
    animations: [routerTransition()]
})
export class PaymentComponent implements OnInit {
    // bar chart
    Contracts:any; role:string;user:string; MediaParticipants:any=[];
    Vendors:any=[];
    Agency:any=[];
    vendorcontract:any=[];agencycontract:any=[];    
    @Input() updateStatus = { deal: {}, currentDealStatus: '', paymentAmount:'', paymentDate:''}
    constructor(public restApi: RestApiService,public router: Router) {}

    ngOnInit() {
      this.role=sessionStorage.getItem('Loggedinrole');
      this.user=sessionStorage.getItem('isLoggedin');
      this.getMediaParticipants();
     this.getVendors();
     this.getAgencies();
       this.loadContracts();     
    }

    DealSelected(event) {
        debugger;
      // console.log('selected employee: ' + event);
       this.updateStatus.deal=event;
     }

    
     
     getMediaParticipants(){
      this.MediaParticipants=[];
      return this.restApi.getMediaPartcipants().subscribe((data: {}) => {         
         this.MediaParticipants=data;
       });
     }

     getVendors(){
      this.Vendors=[];
     return  this.restApi.getVendors().subscribe((data: {}) => {         
         this.Vendors=data;
       });
     }

     getAgencies(){
      this.Agency=[];
     return  this.restApi.getAgency().subscribe((data: {}) => {        
         this.Agency=data;
       })
     }


     loadContracts() 
 {
 
  return this.restApi.getContracts().subscribe((data: {}) => {
    debugger;
    this.Contracts = data;  
    this.Contracts.forEach(element => {
        this.Vendors.forEach(p=>{
          if(p.Id==element.vendor.replace("resource:univisiontmt.Vendor#","")){
            element.vendor= p.username;          
          }
        //  else if(p.mediaParticipantId==element.agency.replace("resource:univisiontmt.MediaParticipant#","")){
           
         // }
        }) 

        this.Agency.forEach(p=>{
          if(p.Id==element.agency.replace("resource:univisiontmt.Agency#","")){
          element.agency= p.username;  
          }
        })
        element.dealFromDate = new Date( element.dealFromDate).toLocaleDateString().split('T')[0];
        element.dealToDate = new Date(element.dealToDate).toLocaleDateString().split('T')[0];
        element.createdDate = new Date( element.createdDate).toLocaleDateString().split('T')[0];
      });
    if(this.role=='vendor'){
        this.vendorcontract=[];
      this.Contracts.forEach(con=>{
          debugger;
        if(con.vendor.toLowerCase()==this.user.toLowerCase() && con.dealStatus.toLowerCase()=='approved'){
  this.vendorcontract.push(con);
        }
      });
      this.Contracts=this.vendorcontract;
    }
      if(this.role=='agency'){
        this.agencycontract=[];
        this.Contracts.forEach(con=>{
          if(con.agency.toLowerCase()==this.user.toLowerCase() && con.dealStatus.toLowerCase()=='approved'){
    this.agencycontract.push(con);
          }
        });
        this.Contracts=this.agencycontract;
      }
  })
 }

    MakePayment(status) {
        debugger;
       // this.updateStatus.deal = contract;
        this.updateStatus.currentDealStatus = status;
        this.updateStatus.paymentDate  = new Date(Date.now()).toUTCString();
        //if (window.confirm('Are you sure, you want to delete?')){
          this.restApi.updateContractStatus(this.updateStatus).subscribe(data => {
            this.router.navigate(['/dashboard'])
          })
        //}
      }  
}
