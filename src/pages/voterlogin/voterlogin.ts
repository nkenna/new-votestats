import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import { HttpClient } from '@angular/common/http';
import { VoterdetailPage } from '../voterdetail/voterdetail';
/**
 * Generated class for the VoterloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-voterlogin',
  templateUrl: 'voterlogin.html',
})
export class VoterloginPage {
  voterID: any;
  voterKey: any;
  

  constructor(private storage: Storage, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VoterloginPage');
  }


  signin() {
    let options: any = {voterid: this.voterID, voterkey: this.voterKey};
    let headers: any		 = {
      headers: { 'Content-Type': 'application/json' }
    } 
       // Use the HttpClient post method to create a new record
       this.http
       .post('http://localhost:3000/voterlogin', options, headers)
       .subscribe((data : any) =>
       {
         
         console.log(data)
          // If the request was successful clear the form of data
          // and notify the user
          //clearform
          this.voterID = '';
          this.voterKey = '';

          this.navCtrl.push(VoterdetailPage, {
            voter: data['voter']
          });
       },
       (error : any) =>
       {
          console.dir(error);
       });
  }

 

}
