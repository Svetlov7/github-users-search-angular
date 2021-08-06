import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../interfaces/user'

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  @Input() data: User[]

  constructor() { }

  ngOnInit(): void {
  }

}
