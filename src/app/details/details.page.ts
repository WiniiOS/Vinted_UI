import { Component, OnInit} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { environement } from 'src/models/environements'

import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage'
import { Inject } from '@angular/core'
import { Product } from 'src/models/interface-products'
import { ItemCart } from '../../models/interface-itemCart'
import { ToastController, ModalController } from '@ionic/angular'
import { ToastOptions } from '@ionic/core'
import { CartPage } from '../cart/cart.page';
import { MethodService } from '../providers/method.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})

export class DetailsPage implements OnInit{
  productDetails :any = [
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
        feed : 0
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
  rate: any
  slideOpts = {
      initialSlide: 0,
      slidesPerView: 1,
      autoplay:true,
      speed:1500
  }

  constructor(
    private activatedRoute : ActivatedRoute,
    @Inject(Storage) public storage: Storage ,
    public toastController : ToastController,
    public modal :ModalController,
    public method : MethodService
  ){}

  onModelChange(value) {
    this.rate = value
    console.log('event', value);
  }

  leaveNote() : void {
    console.log('rate', this.rate);
    // on stocke la moyenne dans 'average'
    let average: number = (this.productDetails.averageStar + this.rate)/2;
    // on arrondi 'average' et on stocke le résultat dans 'aroundi'
    let aroundi : number = Math.ceil(average);
    let utilisateurId: string = this.productDetails.utilisateurId;
    let articleId: string = this.productDetails.id;
    let url: string = `${environement.api_url}/Utilisateurs/${utilisateurId}/Articles/${articleId}`;
    console.log('url', url);
    // this.http.put(url, {"averageStar": aroundi})
    //     .subscribe(res => {
    //       this.presentToast('Votre note a réussi !', 2000);
    //     })
   }

  ngOnInit() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id')
    for (let product of this.productDetails) {
      if(product.id == id){
        this.productDetails = product
      }
    }
  }

  addToCart(productDetails:Product) :void {
    let added :boolean = false
    this.storage.get('Cart').then( (data:ItemCart[]) => {
        // empty cart
        if(data === null || data.length === 0){
          data = []
          data.push({
            item : productDetails,
            qty : 1,
            amount: productDetails.price
          })
        }else {
          for(let i=0;i < data.length;i++){
            const element : ItemCart = data[i]
            //not empty cart and already content the item
            if(element.item.id === productDetails.id){
              element.qty += 1
              element.amount += productDetails.price
              added = true
              break
            }
          }
          // cart not null but not content that item
          if(!added){ 
            data.push(
              {
                item : productDetails,
                qty : 1,
                amount: productDetails.price
              }
            )
          }
        }
        this.storage.set('Cart',data)
        .then((data)=>{
          this.presentToast()
        })
        .catch((error)=>{
          console.log("error",error)
        })
      })
  }

  async presentToast() {
    let options:ToastOptions = {
      message: `${this.productDetails.title} a été ajouté au panier avec success`,
      duration: 1500,
      position: 'top',
      color:'dark'
    }
    const toast = await this.toastController.create(options)
    toast.present()
  }

  async openCart(){
    const modal = await this.modal.create({component: CartPage})
    return await modal.present()
  }

  showFullImage(url,title,event){
    return this.method.showFullImage(url,title,event)
  }

}
