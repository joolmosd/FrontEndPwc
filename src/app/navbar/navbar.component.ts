import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Entities/User';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 
  isLogin:boolean = false;
  constructor(private authenticationService: AuthenticationService) {

    // this.authenticationService.getSesion().subscribe(
    //   estado =>{

    //     console.log(estado)
    //     if(estado == false ){
    //       this.isLogin = estado;
        
    //   }else{
    //     this.isLogin = true;
    //   }
      
    //   }); 
    if( this.authenticationService.isUserLoggedIn() != true){
      this.isLogin= true;
    } else{
      this.isLogin = false;
    }
    console.log(this.authenticationService.isUserLoggedIn())
  }
  ngOnInit(): void {}

  

  logout(){
    this.authenticationService.logout();
  }

}
