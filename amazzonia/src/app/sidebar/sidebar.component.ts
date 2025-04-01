import { Component, Input } from '@angular/core';
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
    @Input() dizionarioProdotti: {[id: string]: number;} = {};

    @Input() canBuy = false;

    totale = 0;

    arrotondaCeil(x: number): number {
        return Math.ceil(x * 100) / 100;
    }

    onRimuoviProdotto(index: number) {

        let prodotto = this.prodottiSelezionati[index];        

        if(this.dizionarioProdotti[prodotto.id] == 1)
            this.prodottiSelezionati.splice(index, 1);

        this.dizionarioProdotti[prodotto.id] = this.dizionarioProdotti[prodotto.id] - 1;
        
        this.totale -= prodotto.prezzo;

        if(this.totale <= 0)
        {
            this.totale = 0;
            this.canBuy = false;
        }

        console.log(this.dizionarioProdotti);
    }

    onAggiungiProdotto(index: number) {
        let prodotto = this.prodottiSelezionati[index];        

        this.dizionarioProdotti[prodotto.id] = this.dizionarioProdotti[prodotto.id] + 1;

        this.totale += prodotto.prezzo;

        this.canBuy = true;

        console.log(this.dizionarioProdotti);
    }

    onPay()
    {
        alert(`Hai speso ${this.totale} Grazie per il tuo acquisto`);
        this.totale = 0;
        this.prodottiSelezionati = [];
    }

}
