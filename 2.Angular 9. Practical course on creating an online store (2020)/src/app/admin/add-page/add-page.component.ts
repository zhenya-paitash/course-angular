import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Product} from "../../shared/interfaces";
import {ProductService} from "../../shared/product.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      type:  new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info:  new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    })
  }

  submit() {
    if (this.form.invalid) return;

    this.submitted = true;
    const product: Product = {
      type:   this.form.value.type,
      title:  this.form.value.title,
      photo:  this.form.value.photo,
      info:   this.form.value.info,
      price:  this.form.value.price,
      date:   new Date()
    };

    this.productService.create(product)
      .subscribe(res => {
        this.form.reset();
        this.submitted = false;
        // this.router.navigate(['/'])
      }, err => {
        // console.error(err);
        this.submitted = false;
      })
  }
}
