import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private searchText = new BehaviorSubject<string>('');
  public addProductPage = false;
  public productsList: any[] = [];
  public idTrack = 0;
  public productListChanged = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient
  ) { }

  public getSearchText() {
    return this.searchText;
  }

  public setSearchText(text: string) {
    this.searchText.next(text);
  }

  public getProductListChanged() {
    return this.productListChanged;
  }

  public setProductListChanged() {
    this.productListChanged.next(true);
  }
 
  public getProductsList() {
    return this.http.get('https://fakestoreapi.com/products');
  }

  public addProduct(product: any) {
    this.productsList.push(product)
  }

  public deleteProduct(id: number) {
    const index = this.findProductIndex(id)

    this.productsList.splice(index, 1);
  }

  public updateProduct(product: any) {
    const index = this.findProductIndex(product.id);

    this.productsList[index] = product;
  }

  private findProductIndex(id: number) {
    return this.productsList.findIndex((obj) => {
      return obj.id === id
    })
  }

  public getProductbyId(id: number) {
    return this.productsList.find((product) => {
      return product.id === id
    })
  }

}
