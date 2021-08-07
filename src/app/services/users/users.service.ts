import { Injectable } from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs'
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators'
import {UserModel} from '../../models/user.model'
import {environment} from '../../../environments/environment'

@Injectable()
export class UsersService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) { }

  getUsers(value: string): Observable<UserModel[]> {
    const perPage = environment.per_page
    let params = new HttpParams()
    params = params.append('q', value)
    params = params.append('per_page', perPage)

    return this.http.get(environment.route, {
      params
    })
      .pipe(
        map((response: any) => {
          return response.items.map(i => {
            return {
              login: i.login,
              id: i.id,
              avatar: i.avatar_url,
              type: i.type,
              link: i.html_url
            }
          })
        }),
        catchError(this.handleError.bind(this))
      )
  }

  private handleError(error: HttpErrorResponse): Observable<string>{
   const status = error.status

   switch (status) {
      case 404 :
        this.error$.next('Something has gone wrong with yours request. Please try again!')
        break
      case 403 :
        this.error$.next('Access denied. Try again during some time!')
        break
      case 503 :
        this.error$.next('Service is not available. Try again during some time!')
        break
    }

   return throwError(error)
  }
}
