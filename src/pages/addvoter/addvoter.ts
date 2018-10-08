import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the AddvoterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addvoter',
  templateUrl: 'addvoter.html',
})
export class AddvoterPage {

  voterID: any;
  voterKey: any;
  email: any;
  election: any;
  user: any;
  status: any;

  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController, private storage: Storage, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    this.election = navParams.get('election');

    this.storage.ready().then(() => {
      this.storage.get('profile').then(profile => {
         //this.user = JSON.parse(profile);
         this.user = profile;
         console.log(this.user)
       }).catch(console.log);
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddvoterPage');
  }

  save(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    let options: any = {voterid: this.voterID, voterkey: this.voterKey, email: this.email, electionid: this.election._id};
    let headers: any		 = {
      headers: { 'Content-Type': 'application/json' }
    } 
       // Use the HttpClient post method to create a new record
       this.http
       .post('https://servervote.herokuapp.com/addvoters', options, headers)
       .subscribe((data : any) =>
       {
          // If the request was successful clear the form of data
          // and notify the user
          //clearform
          this.status = data['status'];
          this.voterID = '';
          this.voterKey = '';
       },
       (error : any) =>
       {
          console.dir(error);
          loading.dismiss();
          this.presentToast('error occured');
       }, ()=>{
        
        loading.dismiss();
        if(this.status == 'success' ){
          this.presentToast('voter added successfully');
        }
       });
    }

    presentToast(msg: string) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000
        
      });
    
      
    
      toast.present();
    }



}
