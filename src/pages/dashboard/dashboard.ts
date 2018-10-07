import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateElectionPage } from '../create-election/create-election';
import {Storage} from "@ionic/storage";
import { HttpClient } from '@angular/common/http';
import { ElectionpositionPage } from '../electionposition/electionposition';
import { AddvoterPage } from '../addvoter/addvoter';
import { ElectionboardPage } from '../electionboard/electionboard';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  selectedElection: any;
  icons: string[];
  elections: any; //Array<{title: string, note: string, icon: string}>;

  user: any;

  constructor(public loadingCtrl: LoadingController, public http: HttpClient, private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.initializeElections();
   this.storage.ready().then(() => {
     this.storage.get('profile').then(profile => {
        //this.user = JSON.parse(profile);
        this.user = profile;
        console.log(this.user)
      }).catch(console.log);
    });
     // If we navigated to this page, we will have an item available as a nav param
     this.selectedElection = navParams.get('election');

 
     this.elections = [];
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  async initializeElections() {
    var re =  await this.http.get('http://localhost:3000/allelections')
    .subscribe((data: any) => {
        this.elections = data.elections;
    },
    (error: any) => {
      console.dir(error)
    });
  }

 

  createElection(event){
    this.navCtrl.push(CreateElectionPage);
  }

  electionTapped(event, election) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DashboardPage, {
      election: election
    });
    loading.dismiss();
  }

  addPosition(event, selectedElection){
    this.navCtrl.push(ElectionpositionPage, {
      election: selectedElection
    });
  }

  addVoterPage(event){
    this.navCtrl.push(AddvoterPage, {
      election: this.selectedElection
    });
  }

  viewResults(event){
    this.navCtrl.push(ElectionboardPage, {
      election: this.selectedElection
    });
  }

  


}
