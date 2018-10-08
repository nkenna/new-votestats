import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { LoginproviderProvider } from '../../providers/loginprovider/loginprovider';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard';
import { AdminsignupPage } from '../adminsignup/adminsignup';
import {Storage} from "@ionic/storage";

/**
 * Generated class for the AdminloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adminlogin',
  templateUrl: 'adminlogin.html',
})
export class AdminloginPage {
  email: any;
  password: any;
  main_data: any;

  login_status: any; //Observable<any>;
  error_msg: any = 'v';

  data: Observable<any>;
  user: any;

  _status: any = {
    status: '',
    token: ''
  };

  

  constructor(public loadingCtrl: LoadingController, public http: HttpClient, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public lProvider: LoginproviderProvider) {
    storage.ready().then(() => {
      storage.get('profile').then(profile => {
        this.user = JSON.parse(profile);
      }).catch(console.log);
    });
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminloginPage');
    this.login_status = this._status;
  }

  signIn(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    this.http.post('https://servervote.herokuapp.com/signin',
    { 
      email : this.email,
      password: this.password
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(data => {
      this.main_data = data
      console.log(this.main_data['status']);
      if(this.main_data['status'] == "1" ){
        this.storage.set('profile', this.main_data['user']);
        this.storage.set('token', this.main_data['token']);  
       
      }else if (this.main_data['status'] == "0"){
          this.error_msg = 'Unauthorized Access';
      }else if (this.main_data['status'] == "2"){
        this.error_msg = 'Unauthorized Access';
      }else if (this.main_data['status'] == "3"){
        this.error_msg = 'Unauthorized Access';
      }
    },
    error => {
      this.main_data = error
      console.log(error);
    }, () => {
      if(this.main_data['status'] == "1" ){

        loading.dismiss();
       
        this.navCtrl.push(DashboardPage);
      }else if (this.main_data['status'] == "0"){
          this.error_msg = 'Unauthorized Access';
      }else if (this.main_data['status'] == "2"){
        this.error_msg = 'Unauthorized Access';
      }else if (this.main_data['status'] == "3"){
        this.error_msg = 'Unauthorized Access';
      }
     
    })


  
   

  }

  signUp(){
    this.navCtrl.push(AdminsignupPage);
  }

}
