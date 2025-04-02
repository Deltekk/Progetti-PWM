import { Component } from '@angular/core';
import { Prodotto } from '../models/prodotto.model';
import { FormsModule } from '@angular/forms'
import { DataMngtService } from '../data-mngt.service';

@Component({
  selector: 'app-edit-product',
  imports: [FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent 
{
    constructor(private datamgnt: DataMngtService){}
    prodotto : Prodotto = {id: 0, nome: "", prezzo: 0, img: ""};

    editProdotto()
    {
        this.datamgnt.EditItem(this.prodotto);
    }

}
