import { Injectable } from '@angular/core';
import {Http,Response,} from '@angular/http';
import {map,catchError} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AvailDataService {
  constructor(private http:Http) { }
 

  getAvailData(){
    return this.http.get(`https://api.myjson.com/bins/164ryb`)
                    .pipe(map(
                        (res:Response)=>res.json())
                    )
                    .pipe(catchError(
                        (error:Response) => {
                            console.log(error);
                            return Observable.throw(error);
                        })
                    );
}


}
