import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Prodotto } from '../models/prodotto.model';

@Component({
    selector: 'app-cart-product',
    imports: [],
    templateUrl: './cart-product.component.html',
    styleUrl: './cart-product.component.css'
})
export class CartProductComponent {
    @Input() id!: number;
    @Input() nome!: string;
    @Input() prezzo!: number;
    @Input() img!: string;
    @Input() count!: number;

    @Output() aggiungiProdotto = new EventEmitter<Prodotto>();
    @Output() rimuoviProdotto = new EventEmitter<Prodotto>();

    onAggiungi(){
        this.aggiungiProdotto.emit({id:this.id, nome:this.nome, prezzo:this.prezzo, img:this.img});
    }

    onRimuovi() {
        this.rimuoviProdotto.emit({id:this.id, nome:this.nome, prezzo:this.prezzo, img:this.img});
    }
}
