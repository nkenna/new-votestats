import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import { HttpClient } from '@angular/common/http';
import { ModalController } from 'ionic-angular';
import { OpenvotePage } from '../openvote/openvote';

/**
 * Generated class for the VoterdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-voterdetail',
  templateUrl: 'voterdetail.html',
})
export class VoterdetailPage {
  voter: any;
  alert: any;

  elections: Array<any>;

  constructor(public modalCtrl : ModalController, private storage: Storage, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    this.voter = navParams.get('voter');
    this.elections = [];
  }

  ionViewDidLoad() {
    console.log(this.voter);
    console.log('ionViewDidLoad VoterdetailPage');

    if(this.voter == null){
      this.alert = 'this voter does not exist';
    }else{
      this.alert = 'Voter Details'
    }

    this.retrieveVoterDetails();
    
  }

  async retrieveVoterDetails(){
    return await this.http.get('https://servervote.herokuapp.com/electionforvote/?voterID=' + this.voter._id )
    .subscribe((data: any) => {
      this.elections = data.elections
    },
  (error: any) =>{
    console.dir(error);
  },
() => {
  console.log('operation completed');
})
  }

  openVote(election: any){
    let openVoteModal = this.modalCtrl.create(OpenvotePage, {election: election, voter: this.voter});
    
   
    openVoteModal.present();
  }



}
