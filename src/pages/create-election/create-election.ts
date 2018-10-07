import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the CreateElectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-election',
  templateUrl: 'create-election.html',
})
export class CreateElectionPage {
  title: any;
  disc: any;
  timeStarts: any;
  timeEnds: any;
  createdBy: any;
  status: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateElectionPage');
  }

  save(){
    new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/addelection',
      { 
        title: this.title,
        disc: this.disc,
        timeStarts : this.timeStarts,
        timeEnds: this.timeEnds
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
