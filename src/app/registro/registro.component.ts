import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../Entities/User';
import { AuthenticationService } from '../Services/authentication.service';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  userObject = new User();
  submitted = false;
  msgError = '';
  mail:any;



  constructor(private fb: FormBuilder,
    private router: Router,private userService: UserServiceService,
    private authenticationService: AuthenticationService) { }

    fgValidacion = this.fb.group({
      names: ['', [Validators.required]],
      lastNames: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      country: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]]
  
    });

  ngOnInit(): void {}

  existsUserName(): void {
    this.userService.getUserName(this.fgValidacion.controls.email.value)
      .subscribe(
        data => {
          if (data != null) {
            this.userNameError();
            //console.log(data);
          }
        },
        error => {
          console.log(error);
        });
  }


  saveUser(): void {
    
    const data = {
      email: this.fgValidacion.controls.email.value,
      id: this.fgValidacion.controls.email.value,
      names: this.fgValidacion.controls.names.value,
      lastNames: this.fgValidacion.controls.lastNames.value,
      password: this.fgValidacion.controls.password.value,
      country: this.fgValidacion.controls.country.value,
      jobTitle: this.fgValidacion.controls.jobTitle.value,
      rol: "ADMIN"
    };

    this.userService.save(data)
      .subscribe(
        data => {
          this.submitted = true;
          //console.log(data);
          this.registerSuccesful();
          //this.sendEmail();
          this.router.navigate(['/login']);
        },
        error => {
          this.msgError = error.message + ' \n ' + error.error.message;
          console.log(error);
        });
  }


  sendEmail(): void {
    this.mail = {
      mailTo: this.fgValidacion.controls.email.value,
      mailSubject: "Satistactory Register",
      mailContent: "Thank You for your registration " + this.fgValidacion.controls.names.value + " " + this.fgValidacion.controls.lastNames.value,
      attachments: []
    };

    console.log(this.mail);
    // this.authenticationService.emailService(this.mail).subscribe(

    //   result => {
    //   console.log(result);
    // }, error => {
    //   console.log(error);
    // });
    this.authenticationService.emailService(this.mail).subscribe();
  }

  newUser() {
    this.userObject.names = "";
    this.userObject.lastNames = "";
    this.userObject.email = "";
    this.userObject.password = "";

  }

  passwordMatch(){

    if(this.fgValidacion.controls.password.value != this.fgValidacion.controls.confirmPassword.value ){

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Password Do not Match',
          showConfirmButton: false,
          timer: 1500
          // height: 20px
        })
    }
  }

  registerSuccesful() {

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Register Succesful',
      showConfirmButton: false,
      timer: 1500
      // height: 20px
    })
  }

  registerError() {

    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Already identification exist ',
      showConfirmButton: true,
      heightAuto: true
    })
  }

  userNameError() {

    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Already user name exist ',
      showConfirmButton: true,
      heightAuto: true
    })
  }

  send(): any {
    // console.log(this.fgValidacion.value);
    // console.log(this.fgValidacion.valid);
    // this.userObject.names = this.fgValidacion.controls.names.value;
    // this.userObject.lastNames = this.fgValidacion.controls.lastNames.value;
    // this.userObject.email = this.fgValidacion.controls.email.value;
    // this.userObject.password = this.fgValidacion.controls.user.value;
    // console.log(this.userObject);

    console.log(this.fgValidacion.value)

  }

}
