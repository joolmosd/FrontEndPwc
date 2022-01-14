import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../Services/authentication.service';

let accesToken: any = null;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  invalidLogin = false;
  loginSuccess = false;
  cookie!: any;
  private identificationUser!: any;
  

  constructor(private fb: FormBuilder,private router: Router,
    private authenticationService: AuthenticationService) { }

    formLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {
  }

  identificarUsuario() {
    
      
    this.authenticationService.login(this.formLogin.controls.email.value, this.formLogin.controls.password.value).subscribe(
      
      (result) =>{

        if (result==null){
          this.loginError();
        }else{

          this.identificationUser = result.id;
          console.log(this.identificationUser);
          console.log("RESPONSE:-->"+result);
          accesToken = this.authenticationService.createBasicAuthToken(this.formLogin.controls.email.value,this.identificationUser);
          console.log(accesToken);
          this.authenticationService.registerSuccessfulLogin(this.identificationUser);
          console.log("accesToken agregado al sesion Storage");
          this.loginSuccesfull();
          this.router.navigate(['/main']);
          
        }
      }, 

      (error) =>{
        console.log(error)
      }
    )
    
  }

  loginSuccesfull() {

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Inicio Satisfactorio',
      showConfirmButton: false,
      timer: 1500
      // height: 20px
    })
  }

  loginError() {

    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Credenciales Invalidas',
      showConfirmButton: true,
      heightAuto: true
    })
  }



}
