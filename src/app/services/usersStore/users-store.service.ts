import { Injectable } from '@angular/core'
import {UserModel} from '../../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UsersStoreService {
  users: UserModel[] = []
  constructor() { }

  storeUsers(data: UserModel[]): void {
    this.users = data
  }

  getUsersById(id: number): UserModel {
    return this.users.find(item => item.id === id)
  }
}
