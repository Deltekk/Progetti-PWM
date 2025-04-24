import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Importa questo!

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
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
  
    // Metodo per la submit
    onSubmit() {
      if (this.loginForm.valid) {
        
        // Puoi gestire il login qui
        const name = this.loginForm.value.name;
        const email = this.loginForm.value.email;
        
        console.log(name, email);
      }
    }
}
