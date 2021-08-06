import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {UsersService} from '../../../services/users/users.service'
import {ActivatedRoute} from '@angular/router'
import {TableViewComponent} from '../../views/table-view/table-view.component'
import {BlockViewComponent} from '../../views/block-view/block-view.component'
import {RefDirective} from '../../../directives/ref/ref.directive'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {UsersStoreService} from '../../../services/usersStore/users-store.service'
import {User} from '../../../interfaces/user'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-blocks-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss'],
  providers: [UsersService]
})
export class UsersListPageComponent implements OnInit, OnDestroy {

  @ViewChild(RefDirective) refDir: RefDirective

  activePath: string = this.route.snapshot.routeConfig.path
  loader: boolean = false
  usersData: User[] = []
  form: FormGroup
  pSub: Subscription
  notFound: boolean = false

  constructor(public users: UsersService,
              private route: ActivatedRoute,
              private resolver: ComponentFactoryResolver,
              private usersStore: UsersStoreService,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl('', [Validators.required])
    })
  }

  onSubmit(): void {
    const value = this.form.value.text
    this.loader = true
    this.pSub = this.users.getUsers(value).subscribe(users => {

      if (users.length) {
        this.usersData = users
        this.saveToStore(users)
        this.notFound = false
        this.activePath === 'table'
          ? this.renderList(TableViewComponent) : this.renderList(BlockViewComponent)
      } else {
        this.notFound = true
      }
      this.loader = false
    }, error => {
      this.loader = false
      this.usersData = []
    })
  }

  renderList(component = BlockViewComponent): void {
    const templateFactory = this.resolver.resolveComponentFactory(component)
    this.refDir.containerRef.clear()
    const currentComponent = this.refDir.containerRef.createComponent(templateFactory)
    currentComponent.instance.data = this.usersData
  }

  // Caching data
  saveToStore(data): void {
    this.usersStore.storeUsers(data)
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }
}
