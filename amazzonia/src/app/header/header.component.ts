import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {

    constructor(private authService: AuthService, private router: Router) { }

    isLogged: boolean = false;
    private sub?: Subscription;

    ngOnInit() {
        this.sub = this.authService.isLoggedInObservable().subscribe(is => { this.isLogged = is });
    }

    ngOnDestroy() {
        // Libera la subscription per evitare memory leak
        this.sub?.unsubscribe();
    }

    logout() {
        this.authService.logout();
        this.router.navigateByUrl('/login');
    }
}
