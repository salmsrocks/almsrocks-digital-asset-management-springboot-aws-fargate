export interface User {
    
    Id:string;
    username:string;
}


export interface Transaction {
  transactionId:string;
  transactionType:string; 
  transactionInvoked:any;
  participantInvoking :any;
  identityUsed:any;
  eventsEmitted:any;
  transactionTimestamp:string;
}

export interface Contract {
    dealId: String;
    dealName: String;
    dealStatus: String;    
    vendor: any;
    agency: any;
    dealType: String;
    dealFromDate: String;
    dealToDate: String;
    createdDate: String;
    dealCurrency:String;
    paymentStatus: String;
    paymentDate:String;
}