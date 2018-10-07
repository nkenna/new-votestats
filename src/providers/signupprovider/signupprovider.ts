import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the SignupproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SignupproviderProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SignupproviderProvider Provider');
  }

  signup(firstname, lastname, email, password ){
    console.log(firstname)
    console.log(lastname)
    console.log(email)
    console.log(password)
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/signup',
      { 
        firstname: firstname,
        lastname: lastname,
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
  });
  }

}
