import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public productsList: any = []
  private subscription!: Subscription;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.subscription = this.appService.getSearchText().subscribe((text) => {
      this.filterProducts(text);
    })

    this.appService.getProductListChanged().subscribe((res) => {
      this.productsList = [...this.appService.productsList];
    })
  }

  private filterProducts(text: string) {
    text = text.toLowerCase();
    this.productsList = this.appService.productsList.filter((obj: any) => {
      return obj?.description?.toLowerCase().includes(text) || 
             obj?.category?.toLowerCase().includes(text) || 
             obj?.title?.toLowerCase().includes(text);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
