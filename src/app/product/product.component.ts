import { Component, Input, OnInit } from '@angular/core';
import { Rating } from '../models/model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() public id = ''
  @Input() public title = ''
  @Input() public imageurl = '';
  @Input() public description = '';
  @Input() public price = '';
  @Input()
  public rating!: Rating;


  constructor() { }

  ngOnInit(): void {
  }

}
