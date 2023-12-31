import {Injectable} from '@angular/core';
import {User} from '../models/user.model'
import { HttpClient } from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
    private localStore:LocalStorageService) {
  }

  login(user: User) {
    return this.http.post('/api/user/login', {
      username:user.getUserName(),
      password:user.getPassword()
    })

  }
  setCurrentUser (user:User) {
    const loggedInUser = {
      id:user.getId(),
      username:user.getUserName()
    }
    localStorage.setItem('currentUser',JSON.stringify(loggedInUser))
    this.localStore.checkAndAddDataToStorage(loggedInUser.id,loggedInUser.username)

  }
  isAuthenticated(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
    if (currentUser) {
      return true
    }
    return false
  }


  logout() {
    localStorage.removeItem('currentUser')
  }
}

