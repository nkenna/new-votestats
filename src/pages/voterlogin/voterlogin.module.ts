import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoterloginPage } from './voterlogin';

@NgModule({
  declarations: [
    VoterloginPage,
  ],
  imports: [
    IonicPageModule.forChild(VoterloginPage),
  ],
})
export class VoterloginPageModule {}
