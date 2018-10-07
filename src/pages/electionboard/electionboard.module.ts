import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElectionboardPage } from './electionboard';

@NgModule({
  declarations: [
    ElectionboardPage,
  ],
  imports: [
    IonicPageModule.forChild(ElectionboardPage),
  ],
})
export class ElectionboardPageModule {}
