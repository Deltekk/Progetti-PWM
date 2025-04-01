import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductComponent } from './product/product.component';
import { faker } from '@faker-js/faker';
import { HeaderComponent } from './header/header.component';
import { Prodotto } from './models/prodotto.model';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, SidebarComponent, ProductComponent, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent {
    title = 'amazzonia';

    prodotti: Prodotto[] = [
        { id: 1, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69420/200" },
        { id: 2, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69421/200" },
        { id: 3, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69422/200" },
        { id: 4, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69423/200" },
        { id: 5, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69424/200" },
    ]

    prodottiSelezionati: Prodotto[] = [];

    onProdottoAggiunto(p: Prodotto) {
        this.prodottiSelezionati.push(p);
        console.log(p);
    }

}

