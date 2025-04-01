import { Injectable } from '@angular/core';
import { Prodotto } from './models/prodotto.model';

@Injectable({
  providedIn: 'root'
})

export class DataMngtService {
    data: Prodotto[] = [];
    
    constructor() { }
    
    GetData(){
        return this.data;
    }
    
    SetData(data: Prodotto[]){
        this.data = data;
    }

    SetItem(p: Prodotto){
        this.data.push(p);
    }
    
}
