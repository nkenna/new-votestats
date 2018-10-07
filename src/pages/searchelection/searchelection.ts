import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the SearchelectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchelection',
  templateUrl: 'searchelection.html',
})
export class SearchelectionPage {

  searchQuery: string = '';
  elections: Array<any>;
  selectedItem: any;
  icons: string[];
  //elections: Array<{title: string, note: string}>;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    //this.elections = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchelectionPage');
    this.initializeElections();
  }

    

  async initializeElections() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    var re =  await this.http.get('http://localhost:3000/allelections')
    .subscribe((data: any) => {
        this.elections = data.elections;
    },
    (error: any) => {
      console.dir(error)
    },()=>{
      loading.dismiss();
    });
    
  
      console.log(this.elections)
   
  }

  getElections(ev: any) {
    // Reset items back to all of the items
    this.initializeElections();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.elections = this.elections.filter((election) => {
        return (election.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  electionTapped(event, election) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SearchelectionPage, {
      election: election
    });
  }

}
