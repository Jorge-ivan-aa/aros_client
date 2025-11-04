import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-creation-form',
  templateUrl: './product-creation-form.html',
  imports: [ReactiveFormsModule],
})
export class ProductCreationForm {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  form = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    estimateTime: new FormControl(0),
    preparationArea: new FormControl(1),
  });

  /**
   * availables preparation areas
   */
  preparationAreas = [
    { id: 1, name: 'Kitchen' },
    { id: 2, name: 'Bar' },
  ];



  createProduct() {
    this.http.post(`${this.apiUrl}/products`, {
      name: this.form.get('name')?.value,
      price: this.form.get('price')?.value,
      description: this.form.get('description')?.value,
      estimateTime: this.form.get('estimateTime')?.value,
      areaId: this.form.get('preparationArea')?.value,
    }).subscribe({
      next: (r) => console.log(r),
      error: (er) => console.log(er)
    });
  }

  private fetchForAreas() {
    //
  }
}
