import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupproviderProvider } from '../../providers/signupprovider/signupprovider';
import { HomePage } from '../home/home';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the AdminsignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adminsignup',
  templateUrl: 'adminsignup.html',
})
export class AdminsignupPage {
  firstname: any;
  lastname: any;
  email: any;
  password: any;

  status: any;
  

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, public inProvider: SignupproviderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminsignupPage');
  }

  signUp(){
    this.http.post('https://servervote.herokuapp.com/signup',
    { 
      firstname: this.firstname,
      lastname: this.lastname,
      email : this.email,
      password: this.password
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(data => {
     console.log(data['status']);
     this.status = data['status'];
    },
    error => {
      
      console.log(error);
    }, () => {
      if(this.status == 'success'){
         this.navCtrl.push(HomePage);
      }
     
    })
    
    
  }

}
