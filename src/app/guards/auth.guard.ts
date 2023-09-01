import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService:TokenService,
    private router:Router
  ){}

  canActivate():boolean{  
  //  const token=this.tokenService.getToken();
  //   if(!token){
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  //   return true;
    const isValidToken=this.tokenService.isValidToken();
    // console.log('is valid token from auth guard',isValidToken);
    if(!isValidToken){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
