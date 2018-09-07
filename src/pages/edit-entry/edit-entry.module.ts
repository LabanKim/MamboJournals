import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEntryPage } from './edit-entry';

@NgModule({
  declarations: [
    EditEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(EditEntryPage),
  ],
})
export class EditEntryPageModule {}
