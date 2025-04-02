import { Component } from '@angular/core';
import { Prodotto } from '../models/prodotto.model';
import { FormsModule } from '@angular/forms'
import { DataMngtService } from '../data-mngt.service';

@Component({
  selector: 'app-remove-product',
  imports: [FormsModule],
  templateUrl: './remove-product.component.html',
  styleUrl: './remove-product.component.css'
})
export class RemoveProductComponent 
{
    constructor(private datamgnt: DataMngtService){}
    id: number = 0;

    removeProdotto(){
        this.datamgnt.RemoveItem(this.id);
        this.id = 0;
    }

}
