import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Prodotto } from '../models/prodotto.model';
import { FormsModule } from '@angular/forms'
import { DataMngtService } from '../data-mngt.service';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  standalone: true
})

export class AddProductComponent {
  constructor(private datamgnt: DataMngtService){}
  
  prodotto : Prodotto = {id: 0, nome: "", prezzo: 0, img: ""};

  addProdotto()
  {
    this.datamgnt.SetItem(this.prodotto);
    this.prodotto = {id: 0, nome: "", prezzo: 0, img: ""};
    console.log(this.datamgnt.GetData());
  }

}
