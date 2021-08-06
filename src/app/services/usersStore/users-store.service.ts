import { Injectable } from '@angular/core'
import {User} from '../../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UsersStoreService {
  users: User[] = []
  constructor() { }

  storeUsers(data: User[]): void {
    this.users = data
  }

  getUsersById(id: number): User {
    return this.users.find(item => item.id === id)
  }
}
