import { Component, EventEmitter, Input, Output } from '@angular/core';

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

    @Output() rimuoviProdotto = new EventEmitter<void>();

    onRimuovi() {
        this.rimuoviProdotto.emit();
    }
}
