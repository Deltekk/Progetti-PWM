import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { Prodotto } from '../models/prodotto.model';

@Component({
    selector: 'app-sidebar',
    imports: [CartProductComponent],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})

export class SidebarComponent {

    @Input() prodottiSelezionati: Prodotto[] = [];
    @Input() dizionarioProdotti: { [id: string]: number; } = {};

    @Input() canBuy = false;
    @Input() totale = 0;

    @Output() modifiedTotal = new EventEmitter<number>();
    @Output() modifiedCanBuy = new EventEmitter<boolean>();
    @Output() modifiedProdottiSelezionati = new EventEmitter<Prodotto[]>();
    @Output() modifiedDizionarioProdotti = new EventEmitter<{ [id: string]: number; }>();


    arrotondaCeil(x: number): number {
        return Math.ceil(x * 100) / 100;
    }

    onRimuoviProdotto(index: number) {

        let prodotto = this.prodottiSelezionati[index];

        if (this.dizionarioProdotti[prodotto.id] == 1)
            this.prodottiSelezionati.splice(index, 1);

        this.dizionarioProdotti[prodotto.id] = this.dizionarioProdotti[prodotto.id] - 1;

        this.totale -= prodotto.prezzo;

        if (this.prodottiSelezionati.length <= 0) {
            this.totale = 0;
            this.canBuy = false;
        }

        this.modifiedTotal.emit(this.totale);
        this.modifiedCanBuy.emit(this.canBuy);
        this.modifiedDizionarioProdotti.emit(this.dizionarioProdotti);

        console.log(this.dizionarioProdotti);
    }

    onAggiungiProdotto(index: number) {
        let prodotto = this.prodottiSelezionati[index];

        this.dizionarioProdotti[prodotto.id] = this.dizionarioProdotti[prodotto.id] + 1;

        this.totale += prodotto.prezzo;

        this.canBuy = true;

        this.modifiedTotal.emit(this.totale);
        this.modifiedCanBuy.emit(this.canBuy);
        this.modifiedDizionarioProdotti.emit(this.dizionarioProdotti);

        console.log(this.dizionarioProdotti);
    }

    onPay() {
        alert(`Hai speso ${this.totale} Grazie per il tuo acquisto`);

        this.totale = 0;
        this.canBuy = false;

        this.prodottiSelezionati = [];
        this.dizionarioProdotti = {};

        this.modifiedTotal.emit(this.totale);
        this.modifiedCanBuy.emit(this.canBuy);
        this.modifiedProdottiSelezionati.emit(this.prodottiSelezionati);
        this.modifiedDizionarioProdotti.emit(this.dizionarioProdotti);
    }

}
