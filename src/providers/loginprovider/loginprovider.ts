import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


/*
  Generated class for the LoginproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginproviderProvider {
  
  main_data: any;


  constructor(public http: HttpClient) {
    console.log('Hello LoginproviderProvider Provider');
   
  }

  
 


  

 signin(email, password){

    this.http.post('http://localhost:3000/signin',
    { 
      email : email,
      password: password
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(data => {
      this.main_data = data
      console.log(data['status']);
    },
    error => {
      this.main_data = error
      console.log(error);
    })

    return this.main_data
   

     /*  return new Promise((resolve, reject) => {
        this.http.post('http://localhost:3000/signin',
        { 
          email : email,
          password: password
        },
        {
          headers: { 'Content-Type': 'application/json' }
        } 
      ).toPromise()
      .then((response) => {
        console.log(response);
        resolve(response);
      }).catch((error) => {
        console.error(error.status);
        console.error(JSON.stringify(error));
        reject(error);
      });
    }); */

      }



}



