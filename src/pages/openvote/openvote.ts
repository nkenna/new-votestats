import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from 'ionic-angular';

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
  candidates: any;

  votebtn: boolean;

  candidate: any;
  status: any; 

  constructor(public loadingCtrl: LoadingController, private toastCtrl: ToastController, public http: HttpClient, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.voter = this.navParams.get('voter');
    this.election = this.navParams.get('election');

    console.log(this.voter.voted);

    this.retrieveElectionDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenvotePage');
  }

  async retrieveElectionDetails(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    return await this.http.get('http://localhost:3000/electiondetails/?electionID=' + this.election._id )
    .subscribe((data: any) => {
      this.election = data.election;
      this.electiondataPositions = data.positions;
      this.electiondataBallots = data.ballots;
      this.candidates = data.candidates;
    },
  (error: any) =>{
    
    console.dir(error);
  },
() => {
  loading.dismiss();
  console.log('operation completed');
})
  }

  async vote(c, e, v){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    console.log(c);

    let options: any = {title: c, election: e, voter: v};
    let headers: any		 = {
      headers: { 'Content-Type': 'application/json' }
    } 

    return await this.http.post('http://localhost:3000/vote', options, headers)
    .subscribe((data: any) =>{
      this.status = data.status;
    },
  (error: any) => {
    loading.dismiss();
    console.dir(error);
    this.presentToast('error in vote' );
  }, ()=>{
    loading.dismiss();
    if(this.status == 'success' ){
      this.presentToast('vote successfull' );
    }else{
      this.presentToast('error in vote' );
    }
  })
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
      
    });    
  
    toast.present();
  }

}
