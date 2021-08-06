import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../interfaces/user'

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.scss']
})
export class BlockViewComponent implements OnInit {
  @Input() data: User[]

  constructor() { }

  ngOnInit(): void {
  }

}
