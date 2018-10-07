import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateElectionPage } from './create-election';

@NgModule({
  declarations: [
    CreateElectionPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateElectionPage),
  ],
})
export class CreateElectionPageModule {}
