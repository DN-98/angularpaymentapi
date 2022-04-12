import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AuthManagementService } from 'src/app/services/auth/auth-management.service';
import { PaymentDetailService } from 'src/app/services/crud/payment-detail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, 
      // Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)"),
      // Validators.pattern("a+")
    ])
  })

  passStatus = 'Field Required'
  
  get getEmail (){
    return this.loginForm.get("email")
  }

  get getPass (){
    return this.loginForm.get("password")
  }

  swalLoginSuccess = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(public authService: AuthManagementService, public router: Router) { 
  }
  
  onLogin = () => {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe(
        res => {
          if(res){
            this.authService.setAuthorizationToken(res.token, res.refreshToken)
            this.swalLoginSuccess.fire(
            {
              icon: 'success',
              title: 'Signed in successfully'
            }
            ).then(
              ()=> {
                this.loginForm.reset()
                this.router.navigate([ 'dashboard' ])
              }
            )
          }
        },
        (err) => 
        {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: `${err}`
          });   
        }
      );   
    }
  }

  ngOnInit(): void {
    // this.loginForm.valueChanges.subscribe(val => {
    //   this.passStatus = 'Password must include:'
    //   let regex = [/[0-9]/, /[a-z]/, /[A-Z]/, /\W/];
    //   let status = ["\nnumber ", "\nlowercase ", "\nuppercase ", "\nuniqe char"]
      
    //   for(let i = 0; i < regex.length; ++i){
    //     if(!regex[i].test(val.password)){
    //       this.passStatus += status[i]
    //     }
    //   }

    //   if(val.password.length < 8){
    //     this.passStatus += "\nmin 8 characters"
    //   }

    //   console.log(this.loginForm)
    // })
  }
  

}
