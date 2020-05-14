import { Component, OnInit } from '@angular/core'
import { ModalController, AlertController, NavController } from '@ionic/angular'
import { ItemCart } from 'src/models/interface-itemCart'
import { Storage } from '@ionic/storage'
import { ToastController } from '@ionic/angular'
import { ToastOptions } from '@ionic/core'
import { MethodService } from '../providers/method.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})

export class CartPage implements OnInit {

  total :number = 0
  cartItems :ItemCart[]

  constructor(public modalCtrl:ModalController,public storage :Storage,
              public toastController : ToastController,
              public alertCtrl :AlertController,
              public method :MethodService,
              private navCtrl :NavController) { }

  ngOnInit() {}
  
  ionViewDidEnter(){
    this.storage.get('Cart')
    .then((data:ItemCart[])=>{
      this.cartItems = data
      this.cartItems.forEach((article)=>{
        if(article.item.availability.type === 'Disponible en Magasin'){
          article.item.availability.feed = 0
        }
        this.total += (article.qty*article.item.price) + (article.item.availability.feed) 
      })
    })
    .catch((e)=>{
      console.log('erreur :',e)
    })
  }

  closeModal():void {
    this.modalCtrl.dismiss()
  }

  async removeItem(article:ItemCart,index :number){

    const alert = await this.alertCtrl.create({
      header: 'Attention!',
      subHeader: `Etes-vous sure de vouloir retirer ${article.item.title} ?`,
      buttons: [
        {
        text:'Annuler',
        role:'cancel'
        },
        {
          text:'Retirer',
          handler:() => {
              let price :number = article.item.price
              let qty :number = article.qty
              let feed:number = article.item.availability.feed
              let myTotal:number = feed + price*qty
              this.cartItems.splice(index,1)
              this.storage.set('Cart',this.cartItems)
              .then((data)=>{
                this.total -= myTotal
                this.presentToast(`Article retiré du panier!`)
              })
              .catch(error =>{
                console.log('error',error)
              })
          }
        }
    ]
    })
    await alert.present()
    
  }

  async presentToast(message) {
    const toast = await this.toastController.create({ message:message ,duration: 1500,position: 'top',color:'dark'})
      toast.present()
  }

  showFullImage(url,title,event){
    return this.method.showFullImage(url,title,event)
  }

  navigate(){
    this.closeModal()
    this.navCtrl.navigateForward('/action-message')
    
  }

}
