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

    onRimuoviProdotto(index: number) {
        this.prodottiSelezionati.splice(index, 1);
    }

}
