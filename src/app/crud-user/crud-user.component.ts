import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../Entities/User';
import { AuthenticationService } from '../Services/authentication.service';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.css']
})
export class CrudUserComponent implements OnInit {

    data:any = {};

    constructor(private fb: FormBuilder,
    private router: Router,private userService: UserServiceService,
    private authenticationService: AuthenticationService) { }

    fgValidacion = this.fb.group({
      names: ['', [Validators.required]],
      lastNames: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]]
  
    });

  ngOnInit(): void {
    this.data = this.authenticationService.getDatosSesion().split(":");
    //console.log(this.data);
    this.buscarRegistro(this.data[1]);
  }

  editUser(){

    const data ={
      names: this.fgValidacion.controls["names"].value,
      lastNames: this.fgValidacion.controls["lastNames"].value,
      email: this.fgValidacion.controls["email"].value,
      country: this.fgValidacion.controls["country"].value,
      jobTitle: this.fgValidacion.controls["jobTitle"].value
    }

    console.log(data);
    this.userService.update(this.data[1],data).subscribe(
       result => {
        Swal.fire('Correctly Edited!', '', 'success')
        this.router.navigate(['/main']);
        console.log(result)
       }, error =>{
        console.log(error)
       }
    )

  }


  buscarRegistro(id: string){
    this.userService.getWithId(id).subscribe((data) => {
      //console.log(data)
      this.fgValidacion.controls["names"].setValue(data.names)
      this.fgValidacion.controls["lastNames"].setValue(data.lastNames)
      this.fgValidacion.controls["email"].setValue(data.email)
      this.fgValidacion.controls["country"].setValue(data.country)
      this.fgValidacion.controls["jobTitle"].setValue(data.jobTitle)
    })
  }


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

  userNameError() {

    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Already user name exist ',
      showConfirmButton: true,
      heightAuto: true
    })
  }

}
