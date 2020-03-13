import { Component,  OnInit, Input  } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { RestApiService } from "src/app/shared/rest-api.service";


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()],
     
   
})
export class DashboardComponent implements  OnInit {
  Contracts: any = [];
  user:string;
 role:string;
 MediaParticipants:any=[];
 Vendors:any=[];
 Agency:any=[];
 vendorcontract:any=[];
 agencycontract:any=[];
  @Input() updateStatus = { dealId: '',dealName: '',dealStatus: '', agency: '', vendor: '', dealType: '', dealFromDate: '', dealToDate:'' ,
                                  createdDate: new Date().toISOString().split('T')[0], dealCurrency: ''}

  constructor(private router: Router, public restApi: RestApiService) { }

 
 ngOnInit()
 {
  this.role=sessionStorage.getItem('Loggedinrole');
  this.user=sessionStorage.getItem('isLoggedin');
  this.getMediaParticipants();
 this.getVendors();
 this.getAgencies(); 
  this.loadContracts(); 
  
 } 

  getMediaParticipants(){
  this.MediaParticipants=[]; 
  return this.restApi.getMediaPartcipants().subscribe((data: {}) => {         
     this.MediaParticipants=data;
   });
 }

 getVendors(){
  this.Vendors=[];
  return this.restApi.getVendors().subscribe((data: {}) => {         
     this.Vendors=data;
   });
 }

 getAgencies(){
  this.Agency=[];
  return this.restApi.getAgency().subscribe((data: {}) => {        
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
        debugger;
        if(p.Id==element.vendor.replace("resource:univisiontmt.Vendor#","")){
          element.vendor= p.username;          
        }
       // else if(p.mediaParticipantId==element.agency.replace("resource:univisiontmt.MediaParticipant#","")){
         
        //}
      }) 

      this.Agency.forEach(p=>{
        debugger;
        if(p.Id==element.agency.replace("resource:univisiontmt.Agency#","")){
        element.agency= p.username;  
        }
      });
      element.dealFromDate = new Date( element.dealFromDate).toLocaleDateString().split('T')[0];
      element.dealToDate = new Date(element.dealToDate).toLocaleDateString().split('T')[0];
      element.createdDate = new Date( element.createdDate).toLocaleDateString().split('T')[0];
    });
    debugger;
    if(this.role=='vendor'){
      this.vendorcontract=[];
    this.Contracts.forEach(con=>{
      if(con.vendor.toLowerCase()==this.user.toLowerCase()){
this.vendorcontract.push(con);
      }
    });
    this.Contracts=this.vendorcontract;
  }
    if(this.role=='agency'){
      this.agencycontract=[];
      this.Contracts.forEach(con=>{
        if(con.agency.toLowerCase()==this.user.toLowerCase()){
  this.agencycontract.push(con);
        }
      });
      this.Contracts=this.agencycontract;
    }
  })
 } 

 



updateContract(contract,status) {
  
  alert('inside the block');
  alert(contract);
  debugger;
  this.updateStatus.dealId = contract;
  this.updateStatus.dealStatus = status;
  //if (window.confirm('Are you sure, you want to delete?')){
    this.restApi.updateContractStatus(this.updateStatus).subscribe(data => {
      this.loadContracts()
    })
  //}
}

deleteContract(contract) {  
  alert(contract)
 // this.updateStatus.deal = contract;
 // this.updateStatus.currentDealStatus = status;
  //if (window.confirm('Are you sure, you want to delete?')){
    this.restApi.deleteContract(contract).subscribe(data => {
      alert("Contract deleted successfully");
      this.loadContracts()
    })
  //}
}

RedirectToTimeline(contractid){
  debugger;
  sessionStorage.setItem('timelineid', contractid);
  this.router.navigate(['/timeline'])
}

}
   
    