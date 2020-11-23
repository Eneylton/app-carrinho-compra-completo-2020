import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContadorPage } from './contador';

@NgModule({
  declarations: [
    ContadorPage,
  ],
  imports: [
    IonicPageModule.forChild(ContadorPage),
  ],
})
export class ContadorPageModule {}
