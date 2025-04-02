import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddProductComponent } from './add-product/add-product.component';
import { RemoveProductComponent } from './remove-product/remove-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

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
		path: 'remove',
		component: RemoveProductComponent,
		title: 'Rimuovi prodotto'
	},
	{
		path: 'about-us',
		component: AboutUsComponent,
		title: 'About Us'
	},
	{
		path: 'edit',
		component: EditProductComponent,
		title: 'Modifica prodotto'
	}
	
]
