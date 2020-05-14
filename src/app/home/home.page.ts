import { Component,Injectable } from '@angular/core'
import { NavController } from '@ionic/angular'
import { Product } from 'src/models/interface-products'
import { Router } from '@angular/router'
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { MethodService } from '../providers/method.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  articles : Product[]

  constructor(private navCtrl :NavController,private route:Router ,private photoViewer: PhotoViewer,
    public method : MethodService) {
    this.articles = [
      {
        title :'Jacket',
        description :'Une veste de motard en cuir noir super élégante avec des détails de surpiqûres classiques en diamant.',
        price :45,
        categorie :'Vetements',
        createdAt : new Date(),
        state :'Neuf',
        city :'Londres',
        id :'1',
        averageStar : 4,
        availability : {
          available : true,
          type : 'Livraison',
          feed : 10
        },
        pictures: [
          'assets/imgs/Product1/presto1.jpg',
          'assets/imgs/Product1/presto2.webp',
          'assets/imgs/Product1/presto3.jpg',
          'assets/imgs/Product1/presto4.webp'
        ]
      },
      {
        title :'Maquillage',
        description :'Lorem ipsum  dignissimos quibusdam perspiciatis omnis aspernatur',
        price :25,
        categorie :'Mode & Accessoires',
        createdAt : new Date(),
        state :'Neuf',
        city :'Douala',
        id :'2',
        averageStar : 3,
        availability : {
          available : true,
          type : 'Livraison',
          feed : 10
        },
        pictures: [
          'assets/imgs/Product2/makeup1.jpg',
          'assets/imgs/Product2/makeup2.jpg',
          'assets/imgs/Product2/makeup3.jpg',
          'assets/imgs/Product2/makeup4.jpg'
        ]
      },
      {
        title :'Telephone Iphone',
        description :'Lorem ipsum  dignissimos quibusdam perspiciatis omnis aspernatur',
        price :145,
        categorie :'Electroniques',
        createdAt : new Date(),
        state :'Neuf',
        city :'Kinshasa',
        id :'3',
        averageStar : 1,
        availability : {
          available : true,
          type : 'Disponible en Magasin',
          feed : 10
        },
        pictures: [
          'assets/imgs/Product3/phone1.jpg',
          'assets/imgs/Product3/phone2.jpg',
          'assets/imgs/Product3/phone3.jpg',
          'assets/imgs/Product3/phone4.jpg'
        ]
      },
      {
        title :'PS4',
        description :'Lorem ipsum  dignissimos quibusdam perspiciatis omnis aspernatur',
        price :85,
        categorie :'Electroniques',
        createdAt : new Date(),
        state :'Déja utilisé',
        city :'Yaounde',
        id :'4',
        averageStar : 3,
        availability : {
          available : true,
          type : 'Livraison',
          feed : 14
        },
        pictures: [
          'assets/imgs/Product4/ps1.jpg',
          'assets/imgs/Product4/ps2.jpg',
          'assets/imgs/Product4/ps3.jpg',
          'assets/imgs/Product4/ps4.jpg'
        ]
      },
      {
        title :'Ketch Nike',
        description :'Lorem ipsum  dignissimos quibusdam perspiciatis omnis aspernatur',
        price :70,
        categorie :'Chaussures',
        createdAt : new Date(),
        state :'Neuf',
        city :'Londres',
        id :'5',
        averageStar : 2,
        availability : {
          available : true,
          type : 'Livraison',
          feed : 7
        },
        pictures: [
          'assets/imgs/Product5/nike1.jpg',
          'assets/imgs/Product5/nike2.jpg',
          'assets/imgs/Product5/nike3.jpg',
          'assets/imgs/Product5/nike4.jpg'
        ]
      }
    ]
  }

  showDetails(id:string) :void{
    this.navCtrl.navigateForward(`/details/${id}`)
  }

  showFullImage(url,title,event){
    return this.method.showFullImage(url,title,event)
  }

}
