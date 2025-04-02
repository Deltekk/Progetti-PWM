import { Injectable } from '@angular/core';
import { Prodotto } from './models/prodotto.model';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root'
})

export class DataMngtService {
    data: Prodotto[] = [];
    
    constructor() { 
        this.data = [
            { id: 1, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69420/200" },
            { id: 2, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69421/200" },
            { id: 3, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69422/200" },
            { id: 4, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69423/200" },
            { id: 5, nome: faker.commerce.product(), prezzo: Number(faker.commerce.price()), img: "https://picsum.photos/seed/69424/200" },
        ];
    }
    
    GetData(){
        return this.data;
    }
    
    SetData(data: Prodotto[]){
        this.data = data;
    }

    SetItem(p: Prodotto){
        this.data.push(p);
    }
    
    RemoveItem(id: number){
        this.data = this.data.filter( data => data.id != id);
    }

    EditItem(p: Prodotto){
        for (let i = 0; i < this.data.length; i++) {
            let element = this.data[i];

            if(element.id == p.id)
            {
                element.nome = p.nome;
                element.prezzo = p.prezzo;
                element.img = p.img;
            }
            
        }
    }

}
