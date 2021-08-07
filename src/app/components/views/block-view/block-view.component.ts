import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../../models/user.model'

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.scss']
})
export class BlockViewComponent implements OnInit {
  @Input() data: UserModel[]

  constructor() { }

  ngOnInit(): void {
  }

}
