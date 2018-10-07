import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { IonicStorageModule } from '@ionic/storage'

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    IonicStorageModule.forRoot()
  ],
})
export class DashboardPageModule {}
