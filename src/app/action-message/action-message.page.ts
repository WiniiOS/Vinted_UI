import { Component, OnInit } from '@angular/core'


@Component({
  selector: 'app-action-message',
  templateUrl: './action-message.page.html',
  styleUrls: ['./action-message.page.scss'],
})
export class ActionMessagePage implements OnInit {
  msgContent :string
  constructor() { }

  ngOnInit() {
  }
  
  toggleAction(){}

  contact(){}

  send(){}

}
