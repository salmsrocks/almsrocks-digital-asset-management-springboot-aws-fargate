import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-program',
    templateUrl: './program.component.html',
    styleUrls: ['./program.component.scss'],
    animations: [routerTransition()]
})
export class ProgramComponent implements OnInit {
    public minDate: Date = new Date ("01/01/2000");
    public maxDate: Date = new Date ("01/01/2027");
    public placeholder: string = "Choose a Date";
    randomNumVal:number;filedata:any;

    @Input() programDetails = {  programId: '010', programName: '', 
                                  genre: '',programVideo:'', owner: 'univision'}

    
    constructor(public restApi: RestApiService, public router: Router) 
    {
    //  this.randomNumVal=Math.floor(1000 + Math.random() * 9000);
    }
    
    ngOnInit() {}
    onLoad(args: any) 
      {
      
      }
 

      addProgram() 
      {
        debugger;
        this.programDetails.programId="pr"+ Date.now().toString();
        this.programDetails.programVideo=this.filedata;
        this.restApi.createProgram(this.programDetails).subscribe((data: {}) => {
          alert("Program added successfully");
          this.router.navigate(['/programdashboard'])
        }) 
       
      }
      
      public randomNum():number
      {
        
        return this.randomNumVal;
        
      }

     

      onSelectFile(event) {
        debugger;
        if (event.target.files && event.target.files[0]) {
          if(event.target.files[0].type=="image/png" || event.target.files[0].type=="image/jpg" || event.target.files[0].type=="image/jpeg"){
          var reader = new FileReader();
    
          reader.readAsDataURL(event.target.files[0]); // read file as data url
       //   this.filedata=reader.result.toString();  

       reader.onloadend = (e) => {
         debugger;
            this.filedata = reader.result;
          }
    
//           reader.onload = (event) => { // called once readAsDataURL is completed
//           debugger;
//           // var base64 = event.target.result.toString();
//            var base64=event.target;
// //this.filedata=base64;         

//           }
        }
        else{
          alert("Please upload image with extensions JPG/PNG/JPEG");
          this.programDetails.programVideo="";
          this.filedata="";
        }
      }
     }

     
}                                                                                                 
