import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private appService: AppService
  ) {

  }

  ngOnInit(): void {
    this.getProducts();
  }
  
  private getProducts() {
    this.appService.getProductsList().subscribe((data: any) => {
      console.log(data)
      this.appService.productsList = [...data];
      this.appService.idTrack = this.appService.productsList.length;
      this.appService.setProductListChanged();
    })
  }
}
