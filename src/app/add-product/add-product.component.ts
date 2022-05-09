import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  public productForm!: FormGroup;
  public rating = [1, 2, 3, 4, 5];
  public isEdit = false;
  private product: any;
  public formsubmitted = false

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.appService.addProductPage = true;

    this.productForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageurl: new FormControl('', [Validators.required]),
      rating: new FormControl(1, [Validators.required]),
    });

    this.isEdit = JSON.parse(this.route.snapshot.queryParams['edit'])

    if(this.isEdit) {
      this.product = this.appService.getProductbyId(+this.route.snapshot.queryParams['productid'])
      if(!this.product) {
        this.router.navigate(['/']);
        return;
      }
      this.productForm.get('title')?.setValue(this.product.title);
      this.productForm.get('price')?.setValue(this.product.price);
      this.productForm.get('category')?.setValue(this.product.category);
      this.productForm.get('description')?.setValue(this.product.description);
      this.productForm.get('imageurl')?.setValue(this.product.image);
      this.productForm.get('rating')?.setValue(Math.round(this.product.rating.rate));
    }

  }

  public onFormSubmit() {

    this.formsubmitted = true;

    if(this.productForm.valid) {
      const product = {
        id: (this.isEdit) ? this.product.id : this.appService.idTrack + 1,
        title: this.productForm.get('title')?.value,
        price: this.productForm.get('price')?.value,
        description: this.productForm.get('description')?.value,
        image: this.productForm.get('imageurl')?.value,
        category: this.productForm.get('category')?.value,
        rating: {
          rate: this.productForm.get('rating')?.value,
          count: (this.isEdit) ? this.product.rating.count : 1
        }
      }
  
      if(this.isEdit) {
        this.appService.updateProduct(product)
      } else {
        this.appService.addProduct(product);
      }
  
      this.router.navigate(['/']);
    }
  }

  public deleteProduct() {
    this.appService.deleteProduct(+this.route.snapshot.queryParams['productid']);
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
      this.appService.addProductPage = false;
  }

}
