import { Component } from '@angular/core';
import { Prodotto } from '../models/prodotto.model';
import { faker } from '@faker-js/faker';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProductComponent } from '../product/product.component';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-home',
    imports: [SidebarComponent, ProductComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    prodotti: Prodotto[] = [
        { id: 1, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69420/200" },
        { id: 2, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69421/200" },
        { id: 3, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69422/200" },
        { id: 4, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69423/200" },
        { id: 5, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69424/200" },
    ]

    prodottiSelezionati: Prodotto[] = [];

    dizionarioProdotti: { [id: string]: number; } = {};

    totale = 0;

    canBuy = false;

    onProdottoAggiunto(p: Prodotto) {
        if (this.dizionarioProdotti[p.id] == null || this.dizionarioProdotti[p.id] == 0) {
            this.dizionarioProdotti[p.id] = 1;
            this.prodottiSelezionati.push(p);
        }
        else {
            this.dizionarioProdotti[p.id] = this.dizionarioProdotti[p.id] + 1;
        }

        this.totale += p.prezzo;
        this.canBuy = true;

        console.log(this.dizionarioProdotti);
    }

    onChangeTotal(totale: number) {
        this.totale = totale;
    }

    onCanBuyChange(canBuy: boolean) {
        this.canBuy = canBuy;
    }

    onChangeProdottiSelezionati(prodottiSelezionati: Prodotto[]) {
        this.prodottiSelezionati = prodottiSelezionati;
    }

    onChangeDizionarioProdotti(dizionarioProdotti: { [id: string]: number; }) {
        this.dizionarioProdotti = dizionarioProdotti;
    }
}
