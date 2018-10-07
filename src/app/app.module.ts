import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CreateElectionPage } from '../pages/create-election/create-election';
import { AdminloginPage } from '../pages/adminlogin/adminlogin';
import { AdminsignupPage } from '../pages/adminsignup/adminsignup';
import { SearchelectionPage } from '../pages/searchelection/searchelection';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ElectionpositionPage } from '../pages/electionposition/electionposition';
import { AddvoterPage } from '../pages/addvoter/addvoter';
import { VoterloginPage } from '../pages/voterlogin/voterlogin';
import { VoterdetailPage } from '../pages/voterdetail/voterdetail';
import { OpenvotePage } from '../pages/openvote/openvote';
import { ElectionboardPage } from '../pages/electionboard/electionboard';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginproviderProvider } from '../providers/loginprovider/loginprovider';
import { HttpClientModule } from '@angular/common/http';
import { SignupproviderProvider } from '../providers/signupprovider/signupprovider';
import { IonicStorageModule } from '@ionic/storage'

import { MomentPipe} from '../pipes/moment/moment';

@NgModule({
  declarations: [
    MomentPipe,
    MyApp,
    HomePage,
    ListPage,
    AdminloginPage,
    CreateElectionPage,
    AdminsignupPage,
    SearchelectionPage,
    DashboardPage,
    ElectionpositionPage,
    AddvoterPage,
    VoterloginPage,
    VoterdetailPage,
    OpenvotePage,
    ElectionboardPage 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CreateElectionPage,
    AdminloginPage,
    AdminsignupPage,
    SearchelectionPage,
    DashboardPage,
    ElectionpositionPage,
    AddvoterPage,
    VoterloginPage,
    VoterdetailPage,
    OpenvotePage,
    ElectionboardPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginproviderProvider,
    SignupproviderProvider
  ]
})
export class AppModule {}
