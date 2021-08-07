import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../../models/user.model'

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  @Input() data: UserModel[]

  constructor() { }

  ngOnInit(): void {
  }

}
