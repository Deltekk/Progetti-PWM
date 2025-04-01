import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';

@Component({
    selector: 'app-product',
    imports: [],
    templateUrl: './product.component.html',
    styleUrl: './product.component.css'
})

export class ProductComponent {

    // Scriviamo gli input per permetterci di visualizzare nel componente i suoi dati

    @Input() id!: number;
    @Input() nome!: string;
    @Input() prezzo!: number;
    @Input() img!: string;

    // L'ouput ci permette di mandare in output l'aggregazione di dati di questo componente

    @Output() aggiungiProdotto = new EventEmitter<{ id: number, nome: string, prezzo: number, img: string }>();

    // Funzione che viene richiamata alla pressione di "aggiungi al carrello"

    onAggiungi() {
        this.aggiungiProdotto.emit({
            id: this.id,
            nome: this.nome,
            prezzo: this.prezzo,
            img: this.img
        });
        console.log("Prodotto emesso!");
    }

    arrotondaCeil(x: number): number {
        return Math.ceil(x * 100) / 100;
    }

}
