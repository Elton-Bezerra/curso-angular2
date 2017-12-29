import { SweetAlertService } from 'ng2-sweetalert2';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AuthService } from './../login/auth.service';
import { default as swal } from 'sweetalert2'

@Injectable()
export class AlunosGuard implements CanActivateChild{

    
  constructor(private authService: AuthService, private router: Router, private sweet: SweetAlertService) { }

  	canActivateChild(
          route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean {
        // console.log(route);
        // console.log(state);
        console.log('AlunosGuard: guarda de rota filha');
        
        if(state.url.includes('editar')){
            // swal('Coé!', 'Cê não tem permissão para acessar essa área!', 'error');
            // return Observable.of(false);
        }

        return true;
      }

}
