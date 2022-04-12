import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthManagementService } from 'src/app/services/auth/auth-management.service';
import { PaymentDetailService } from 'src/app/services/crud/payment-detail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faEnvelope = faEnvelope;
  faUser = faUser;
  faLock = faLock;
  constructor(public auth: AuthManagementService, public router: Router) { }

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  passStatus = 'Field Required';

  get getPass(){
    return this.registerForm.get("password");
  }

  get getEmail(){
    return this.registerForm.get("email");
  }

  get getUsername(){
    return this.registerForm.get("username");
  }

  onRegister = () => {
    if(this.registerForm.valid){
      this.auth.register(this.registerForm.value).subscribe(
        res => 
        {
          if(res){
            Swal.fire(
            {
              icon: 'success',
              title: 'Register successfully'
            }
            ).then(
              ()=> {
                this.registerForm.reset()
                this.router.navigate([ 'login' ])
              }
            )
          }
        }, 
        (err) => 
        {
          Swal.fire({
            icon: 'error',
            title: 'Register Failed',
            text: 'Parameters Invalid'
          });   
        });
    }
  }

  ngOnInit(): void {
  }

}
