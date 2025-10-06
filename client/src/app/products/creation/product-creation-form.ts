import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'product-creation-form',
  templateUrl: './product-creation-form.html',
  imports: [ReactiveFormsModule],
})
export class ProductCreationForm implements OnInit {
  form = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    preparationArea: new FormControl(1),
  });

  /**
   * availables preparation areas
   */
  preparationAreas = [
    { id: 1, name: 'Kitchen' },
    { id: 2, name: 'Bar' },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // 
  }

  createProduct() {
    this.http.post("http://localhost:8080/api/products", {
      name: this.form.get('name')?.value,
      price: this.form.get('price')?.value,
      description: this.form.get('description')?.value,
      estimateTime: 3,
      "areaId": this.form.get('preparationArea')?.value,
    }).subscribe({
      next: (r) => console.log(r),
      error: (er) => console.log(er)
    });
  }
}
