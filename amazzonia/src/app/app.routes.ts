import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddProductComponent } from './add-product/add-product.component';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home'
	},
	{
		path: 'home',
		component: HomeComponent,
		title: 'Home page'
	},
	{
		path: 'add',
		component: AddProductComponent,
		title: 'Aggiungi prodotto'
	},
	{
		path: 'about-us',
		component: AboutUsComponent,
		title: 'About Us'
	}
	
]
