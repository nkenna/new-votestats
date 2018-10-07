import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenvotePage } from './openvote';

@NgModule({
  declarations: [
    OpenvotePage,
  ],
  imports: [
    IonicPageModule.forChild(OpenvotePage),
  ],
})
export class OpenvotePageModule {}
