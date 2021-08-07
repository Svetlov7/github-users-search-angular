import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {UsersService} from '../../../services/users/users.service'
import {ActivatedRoute, Router} from '@angular/router'
import {TableViewComponent} from '../../views/table-view/table-view.component'
import {BlockViewComponent} from '../../views/block-view/block-view.component'
import {RefDirective} from '../../../directives/ref/ref.directive'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {UsersStoreService} from '../../../services/usersStore/users-store.service'
import {UserModel} from '../../../models/user.model'
import {Subscription} from 'rxjs'
import {Location} from '@angular/common';

@Component({
  selector: 'app-blocks-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss'],
  providers: [UsersService]
})
export class UsersListPageComponent implements OnInit, OnDestroy {

  @ViewChild(RefDirective) refDir: RefDirective

  activePath: string
  searchParamValue: string
  usersData: UserModel[] = []
  form: FormGroup
  pSub: Subscription
  // If results not found this flag describes message in template
  notFound: boolean = false
  loader: boolean = false

  constructor(public users: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              private resolver: ComponentFactoryResolver,
              private usersStore: UsersStoreService,
              private location: Location
  ) {
    const searchParam = this.route.snapshot.queryParams.q
    this.activePath = this.route.snapshot.routeConfig.path
    this.searchParamValue = searchParam ? searchParam : ''
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl(this.searchParamValue, [Validators.required])
    })
    // If param exist in url make a request
    if (!!this.searchParamValue.trim()) { this.getUsersData(this.searchParamValue) }
  }

  onSubmit(): void {
    const inputValue = this.form.value.text
    this.loader = true
    this.setSearchParamToUrl(inputValue)
    this.getUsersData(inputValue)
  }

  getUsersData(searchValue): void {
    this.pSub = this.users.getUsers(searchValue).subscribe(users => {
      if (!!users.length) {
        this.usersData = users
        // Send data into store
        this.usersStore.storeUsers(users)
        this.notFound = false
      } else {
        this.usersData = []
        // Shows message that result not found
        this.notFound = true
      }
      this.selectTemplate()
      this.loader = false
    }, error => {
      this.loader = false
      this.usersData = []
    })
  }

  // Define the view for users data
  selectTemplate(): void {
    this.activePath === 'table'
      ? this.renderList(TableViewComponent) : this.renderList(BlockViewComponent)
  }

  renderList(component = BlockViewComponent): void {
    const templateFactory = this.resolver.resolveComponentFactory(component)
    this.refDir.containerRef.clear()
    const currentComponent = this.refDir.containerRef.createComponent(templateFactory)
    currentComponent.instance.data = this.usersData
  }

  setSearchParamToUrl(param: string): void {
    const url = this.router
      .createUrlTree([], {relativeTo: this.route, queryParams: {q: param}}).toString()
    this.location.go(url)
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }
}
