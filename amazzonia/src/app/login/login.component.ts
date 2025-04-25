import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Importa questo!
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})

export class LoginComponent {

    statusText: string | null = null;
    isLogin: boolean = true;

    constructor(private loginService: LoginService, private router: Router, private authService: AuthService) { }

    // Definizione del form
    loginForm = new FormGroup({
        name: new FormControl<string>('', [
            Validators.required,
        ]),
        email: new FormControl<string>('', [
            Validators.required,
            Validators.email
        ]),
    });

    changeMode() {
        this.isLogin = !this.isLogin;
    }

    // Metodo per la submit
    onSubmit() {
        if (this.loginForm.valid) {

            // Puoi gestire il login qui
            const name = this.loginForm.value.name;
            const email = this.loginForm.value.email;

            console.log(`${name}, ${email}`);

            if (this.isLogin) {
                this.loginService.Login(name!, email!).subscribe({
                    next: (response) => {
                        this.statusText = response.message;
                        this.authService.login("abc123");
                        this.router.navigateByUrl('/');
                    },
                    error: (err) => {
                        this.statusText = err.error.message;
                    }
                });
            }
            else {
                this.loginService.Signin(name!, email!).subscribe({
                    next: (response) => {
                        this.statusText = response.message;
                        this.authService.login("abc123");
                        this.router.navigateByUrl('/');
                    },
                    error: (err) => {
                        this.statusText = err.error.message;
                    }
                });
            }

        }
    }
}
