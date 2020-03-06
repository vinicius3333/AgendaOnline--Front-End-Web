import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  titulo = 'Login';
  usuario: User;
  registerForm: FormGroup;

  constructor(private authService: AuthService
    ,public router: Router
    ,private toastr: ToastrService
    ,public fb: FormBuilder) { }

  ngOnInit() {
    this.validation();
    if(localStorage.getItem('token') !== null){
      this.router.navigate(['/home']);
    }
  }

  validation() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.usuario = Object.assign({}, this.registerForm.value);
    console.log(this.usuario);
    this.authService.login(this.usuario)
        .subscribe(
          () => {
            this.router.navigate(['/home']);
            this.toastr.success('Logado com sucesso !!!');
          },
          error => {
            this.toastr.error('Falha ao tentar Logar');
          }
        )
  }

}
