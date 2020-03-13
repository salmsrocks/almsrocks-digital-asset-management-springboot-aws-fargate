import { Component, OnInit,Input } from '@angular/core';
import {  ViewEncapsulation, Inject } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { addClass } from '@syncfusion/ej2-base';
import { RestApiService } from "src/app/shared/rest-api.service";
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router } from '@angular/router';


@Component({
    selector: 'app-rightsin',
    templateUrl: './rightsin.component.html',
    styleUrls: ['./rightsin.component.scss'],
     encapsulation: ViewEncapsulation.None,
     animations: [routerTransition()]
})
export class RightsinComponent implements OnInit { 
  // public countries: { [key: string]: Object; }[] = [
  // { Name: 'Australia', Code: 'AU' },
  //     { Name: 'Bermuda', Code: 'BM' },
  //     { Name: 'Canada', Code: 'CA' },
  //     { Name: 'Cameroon', Code: 'CM' },
  //     { Name: 'Denmark', Code: 'DK' },
  //     { Name: 'France', Code: 'FR' },
  //     { Name: 'Finland', Code: 'FI' },
  //     { Name: 'Germany', Code: 'DE' }, 
  // ];
  // maps the local data column to fields property
  public localFields: Object = { text: 'programName', value: 'programId' };
  // set the placeholder to MultiSelect Dropdown input element
  public localWaterMark: string = 'Select programs';
  Programs : any; Contracts:any;agencycontract:any=[];
  selectedItems : any;
  
  @Input() updateStatus = { deal: {}, currentDealStatus: '', programList:[]}

    constructor(public restApi: RestApiService ,public router: Router) {}

    // public specialDate(args, name) {
    //     let span = document.createElement('span');
    //     span.setAttribute('class', 'e-icons highlight');
    //     args.element.firstElementChild.setAttribute('title', name + '!');
    //     addClass([args.element], ['e-day', 'special', name.toLowerCase()]);
    //     args.element.setAttribute('title', name + '!');
    //     args.element.appendChild(span);
    //   }

     
    ngOnInit() {
      alert('innnnn');
     
      this.loadPrograms();
      this.loadContracts();
      alert(this.Programs);
      alert(this.Contracts);
// this.selectedItems = [
//           {"id":2,"itemName":"Singapore"},
//           {"id":3,"itemName":"Australia"},
//           {"id":4,"itemName":"Canada"},
//           {"id":5,"itemName":"South Korea"}
//       ];
// this.dropdownSettings = { 
//             singleSelection: false, 
//             text:"Select Countries",
//             selectAllText:'Select All',
//             unSelectAllText:'UnSelect All',
//             enableSearchFilter: true,
//             classes:"myclass custom-class"
//           };  
    }

  

  loadPrograms() 
 {
  return this.restApi.getPrograms().subscribe((data: {}) => {
    debugger;
    this.Programs = data;
  })
 } 

 loadContracts() 
 {
  return this.restApi.getContracts().subscribe((data: {}) => {
    debugger;
    this.Contracts = data;  

    alert(this.Contracts);
    
  /*   this.agencycontract=[];
         this.Contracts.forEach(con=>{
          if(con.dealStatus.toLowerCase()!=='payment completed'){
    this.agencycontract.push(con);
          }
        }); 
        this.Contracts=this.agencycontract; */
  })
 }

 DealSelected(event) {
   debugger;
 // console.log('selected employee: ' + event);
  this.updateStatus.deal=event;
}



// ProgramsSelected(event) {
//   debugger;
// // console.log('selected employee: ' + event);
//  this.updateStatus.programList=event;
// }
 
 AssignRights(status) {
  debugger;
 // this.updateStatus.deal = contract;
 this.selectedItems=this.updateStatus.programList;
 this.updateStatus.programList=[];

 this.Programs.forEach(element => {
  this.selectedItems.forEach(item=>{
    debugger;
    if(element.programId==item){
    this.updateStatus.programList.push(element);
    }
  });
   
 });

  this.updateStatus.currentDealStatus = status;
  //if (window.confirm('Are you sure, you want to delete?')){
    this.restApi.AssignRights(this.updateStatus).subscribe(data => {
     // this.loadContracts();
      alert("Programs are assigned successfully");
    })
    this.router.navigate(['/dashboard'])

  //}
}

}
