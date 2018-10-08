import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the ElectionpositionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-electionposition',
  templateUrl: 'electionposition.html',
})
export class ElectionpositionPage {
  election: any;
  candidate: any;
  candidates: Array<any>;
  ballottype: any;
  positiondisc: any;
  positiontitle: any;

  data: Array<{electionID: any, positionTitle: any, positionDisc: any, ballotType: any, candidates: any}>

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.election = navParams.get('election');
    console.log(this.election)
    this.candidates = [];
    this.data = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElectionpositionPage');
  }

  addCandidate(event){
    this.candidates.push(this.candidate);
    console.log(this.candidates)
  }

  save(event){
    //console.log(this.election.title)
    //console.log(this.ballottype)

    this.data.push({
      electionID: this.election._id,
      positionTitle: this.positiontitle,
      positionDisc: this.positiondisc,
      ballotType: this.ballottype,
      candidates: this.candidates
    })

    console.log(this.data)

    return new Promise((resolve, reject) => {
      this.http.post('https://servervote.herokuapp.com/addposition',
      { 
        electionID: this.election._id,
        positionTitle: this.positiontitle,
      positionDisc: this.positiondisc,
      ballotType: this.ballottype,
      candidates: this.candidates
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
