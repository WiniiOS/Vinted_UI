import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionMessagePageRoutingModule } from './action-message-routing.module';

import { ActionMessagePage } from './action-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActionMessagePageRoutingModule
  ],
  declarations: [ActionMessagePage]
})
export class ActionMessagePageModule {}
