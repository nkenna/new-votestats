import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as moment from 'moment';
/**
 * Generated class for the ElectionboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-electionboard',
  templateUrl: 'electionboard.html',
})
export class ElectionboardPage {

  election: any;
  positions: Array<any>;
  candidates: Array<any>;
  _election: any;
  status: any;
  startDiff: any;
  endDiff: any;

  

  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    this.election = navParams.get('election');
    this.getElectionPositions();
    this.getElectionCandidates();

   

    setInterval(()=>{
      var now = moment();
      this.startDiff = moment(this.election.startdate).diff(now, 'hours');
      this.endDiff = moment(this.election.enddate).diff(moment(this.election.startdate), 'hours');
      this.getElectionPositions();
    this.getElectionCandidates();
    }, 5000)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElectionboardPage');
  }

 
  

  async start(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

     await this.http.get('https://servervote.herokuapp.com/start/?eid=' + this.election._id )
    .subscribe((data: any) => {
        this._election = data.election['status'];
        this.status = data.status;
      
    },

    (error: any) => {
      console.dir(error)
    }, ()=>{
      loading.dismiss();
      if(this.status == 'success' ){
        this.presentToast('Election started successfully');
      }
      //console.log(this.positions)
    });
  }

  async end(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

     await this.http.get('https://servervote.herokuapp.com/end/?eid=' + this.election._id )
    .subscribe((data: any) => {
        this._election = data.election['status'];
        this.status = data.status;
      
    },

    (error: any) => {
      console.dir(error)
    }, ()=>{
      loading.dismiss();
      if(this.status == 'success' ){
        this.presentToast('Election ended successfully');
      }
      //console.log(this.positions)
    });

  }

  async delete(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

     await this.http.get('https://servervote.herokuapp.com/delete/?eid=' + this.election._id )
    .subscribe((data: any) => {
        this.status = data.status;
      
    },

    (error: any) => {
      console.dir(error)
    }, ()=>{
      loading.dismiss();
      if(this.status == 'success' ){
        this.presentToast('Election deleted successfully');
      }
      this.navCtrl.push(HomePage);
      //console.log(this.positions)
    });

  }

  async getElectionPositions() {
   return await this.http.get('https://servervote.herokuapp.com/positionelection/?eid=' + this.election._id )
    .subscribe((data: any) => {
        this.positions = data.data;
       // console.log(data.data)
       // console.log(666)
    },

    (error: any) => {
      console.dir(error)
    }, ()=>{
      //console.log(this.positions)
    });
    
  
      
   
  }

   getElectionCandidates() {
    return this.http.get('https://servervote.herokuapp.com/candelection/?eid=' + this.election._id)
     .subscribe((data: any) => {
         this.candidates = data.data;
         console.log(this.candidates)
              },     
     (error: any) => {
       console.dir(error)
     }, ()=>{
       console.log(this.candidates)
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
