import { Component, Host, Input, OnInit } from "@angular/core";
import { ControlContainer, FormGroup, FormGroupDirective } from "@angular/forms";

@Component({
  selector: 'form-validation',
  templateUrl: './form-validation.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class FormValidation implements OnInit {
  form!: FormGroup;
  @Input({ required: true }) field!: string;

  /**
   *
   */
  constructor(@Host() private parentFormGroup: FormGroupDirective) {
  }
  
  ngOnInit(): void {
    this.form = this.parentFormGroup.form;
  }
}
