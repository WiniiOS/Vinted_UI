import { Component, OnInit, Output } from '@angular/core';
import { Product, Availability } from 'src/models/interface-products';
import { ImagePicker, ImagePickerOptions, OutputType } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})

export class CreateProductPage implements OnInit {
  myProduct :Product
  categories = []
  cities = []
  myPictures: string[] = []
  constructor( private imagePicker: ImagePicker ) {
    this.myProduct = {} as Product
    this.myProduct.availability = {} as Availability
    this.myProduct.pictures = []
    this.categories = [
      {
        title:"Vetements"
      },
      {
        title:"Chaussures"
      },
      {
        title:"Electroniques"
      },
      {
        title:"Mode & Accessoires"
      },
      {
        title:"Services"
      }
    ]
    this.cities = [
      {
        name:"Douala"
      },
      {
        name:"yaounde"
      },
      {
        name:"Kribi"
      },
      {
        name:"Bertoua"
      },
      {
        name:"Bafoussam"
      },
      {
        name:"Edea"
      },
      {
        name:"Paris"
      },
      {
        name:"Londres"
      }
    ]

  }

  ngOnInit() {
  }

  delete(index){

  }
  
  action(){

  }

  pickImages(){
    let options:ImagePickerOptions = {
      maximumImagesCount:4,
      outputType:OutputType.FILE_URL
    }
    this.imagePicker.getPictures(options)
    .then(results => {
      this.myProduct.pictures = results
      console.log('images',results)
    })
    .catch(error => {
      console.log('error',error)
    })
  }

  create(myProduct :Product){
    myProduct.id = '5'
    myProduct.createdAt = new Date()
    myProduct.averageStar = 1
    myProduct.availability.available = true
    console.log('myProduct',myProduct)
  }

}
