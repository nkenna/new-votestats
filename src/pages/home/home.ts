import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateElectionPage } from '../create-election/create-election';
import { AdminloginPage } from '../adminlogin/adminlogin';
import { AdminsignupPage } from '../adminsignup/adminsignup';
import { SearchelectionPage } from '../searchelection/searchelection';
import { VoterloginPage } from '../voterlogin/voterlogin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //adminloginPage: any;

  constructor(public navCtrl: NavController) {
    //this.adminloginPage = AdminloginPage;
  }

  //move to create election page
  createElection(event) {
    this.navCtrl.push(CreateElectionPage);
}

 //move to create login page
 adminLogin(event) {
  this.navCtrl.push(AdminloginPage);
}

voterLogin(event) {
  this.navCtrl.push(VoterloginPage);
}

adminSignup(event) {
  this.navCtrl.push(AdminsignupPage);
}

searchElection(event) {
  this.navCtrl.push(SearchelectionPage);
}


}
