import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {UsersStoreService} from '../../../services/usersStore/users-store.service'
import {User} from '../../../interfaces/user'

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, OnDestroy {

  user: User
  pageId: string = this.route.snapshot.params.id
  constructor(private route: ActivatedRoute,
              private usersStore: UsersStoreService,
              private router: Router
  ) { }

  ngOnInit(): void {
    const data = this.usersStore.getUsersById(+this.pageId)
      ? this.usersStore.getUsersById(+this.pageId)
      : JSON.parse(sessionStorage.getItem(this.pageId))

    // If data undefined than redirect to 404 and clear storage
    if (!data) {
      this.clearSessionStorage()
      this.router.navigate(['/404'])
    }
    // If user decide to refresh the page, data will be saved
    sessionStorage.setItem(this.pageId, JSON.stringify(data))
    this.user = data
  }

  ngOnDestroy(): void {
    this.clearSessionStorage()
  }

  clearSessionStorage(): void {
    sessionStorage.removeItem(this.pageId)
  }
}
