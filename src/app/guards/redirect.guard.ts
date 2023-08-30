import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(
    private tokenService:TokenService,
    private router:Router
  ){}

  canActivate():boolean{
   const token=this.tokenService.getToken();
    if(token){
      this.router.navigate(['/app']);
    }
    return true;
  }

}
