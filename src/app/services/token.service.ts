import { Injectable } from '@angular/core';
import {getCookie,setCookie,removeCookie} from 'typescript-cookie'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token:string){
    setCookie('token-trello',token,{expires:365,path:'/'})
    // localStorage.setItem('token',token);
  }
  getToken(){
    // const token=localStorage.getItem('token');
    const token=getCookie('token-trello');
    return token;
  }
  removeToken(){
    removeCookie('token-trello')
    // localStorage.removeItem('token');
  }
}
