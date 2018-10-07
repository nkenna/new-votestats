import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the OpenvotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-openvote',
  templateUrl: 'openvote.html',
})
export class OpenvotePage {
  voter: any;
  election: any;
  electiondataPositions: any;
  electiondataBallots: any;
  electiondataCandidates: any;

  votebtn: boolean;

  candidate: any;

  constructor(public http: HttpClient, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.voter = this.navParams.get('voter');
    this.election = this.navParams.get('election');

    console.log(this.voter.voted);

    this.retrieveElectionDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenvotePage');
  }

  async retrieveElectionDetails(){
    return await this.http.get('http://localhost:3000/electiondetails/?electionID=' + this.election._id )
    .subscribe((data: any) => {
      this.election = data.election;
      this.electiondataPositions = data.positions;
      this.electiondataBallots = data.ballots;
      this.electiondataCandidates = data.candidates;
    },
  (error: any) =>{
    console.dir(error);
  },
() => {
  console.log('operation completed');
})
  }

  async vote(c, e, v){
    console.log(c);

    let options: any = {cid: c, election: e, voter: v};
    let headers: any		 = {
      headers: { 'Content-Type': 'application/json' }
    } 

    return await this.http.post('http://localhost:3000/vote', options, headers)
    .subscribe((data: any) =>{

    },
  (error: any) => {
    console.dir(error);
  })
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
