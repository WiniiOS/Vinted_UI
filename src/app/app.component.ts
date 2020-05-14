import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Category } from 'src/models/interface-category';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  categories : Category[]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl :NavController
  ) {
    this.initializeApp()
    this.categories = [
      {
        title:'Vetements',
        description:'Pour les vetements',
        icon:'shirt'
      },
      {
        title:'Electroniques',
        description:'Appareils electronique ou numerique',
        icon:'phone-portrait-sharp'
      },
      {
        title:'Mode & Accessoires',
        description:'Articles de mode et accessoires...',
        icon:'basket-sharp'
      },
      {
        title:'Chaussures',
        description:'Pour les chaussures',
        icon:'paw-outline'
      },
      {
        title:'Services',
        description:'Prestations de services',
        icon:'briefcase'
      }
      

    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  navigate(route:string){
    this.navCtrl.navigateForward(route)
  }
}
