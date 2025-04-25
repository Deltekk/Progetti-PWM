import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddProductComponent } from './add-product/add-product.component';
import { RemoveProductComponent } from './remove-product/remove-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home'
	},
	{
		path: 'login',
		component: LoginComponent,
		title: 'Login'
	},
	{
		path: 'home',
		component: HomeComponent,
		title: 'Home page',
		canActivate: [authGuard]
	},
	{
		path: 'add',
		component: AddProductComponent,
		title: 'Aggiungi prodotto',
		canActivate: [authGuard]
	},
	{
		path: 'remove',
		component: RemoveProductComponent,
		title: 'Rimuovi prodotto',
		canActivate: [authGuard]
	},
	{
		path: 'about-us',
		component: AboutUsComponent,
		title: 'About Us',
		canActivate: [authGuard]
	},
	{
		path: 'edit',
		component: EditProductComponent,
		title: 'Modifica prodotto',
		canActivate: [authGuard]
	},
	{
		path: '**',
		component: NotFoundComponentComponent,
		title: 'Pagina non trovata'
	}

]
