import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public searchText = '';

  constructor(
    public appService: AppService
  ) { }

  ngOnInit(): void {

  }

  public onSearch() {
    this.appService.setSearchText(this.searchText);
  }

}
