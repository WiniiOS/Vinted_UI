import { Injectable } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';


@Injectable({
  providedIn: 'root'
})

export class MethodService {

  constructor(public photoViewer:PhotoViewer) { }

  showFullImage(url:any,title?:string,event?:any){
    event.stopPropagation()
    this.photoViewer.show(url,title)
  }

}
