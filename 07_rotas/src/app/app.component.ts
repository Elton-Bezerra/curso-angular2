import { AuthService } from './login/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  mostrarMenu: boolean = false;


  constructor(private authService: AuthService){  }

  ngOnInit() {
    this.authService.mostrarMenuEmitter.subscribe(
      (res) => {
        this.mostrarMenu = res;
      }
    );   
  }
}
