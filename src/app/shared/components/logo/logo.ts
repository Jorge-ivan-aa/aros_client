import { Component, Input } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.html',
  styles: ``,
})
export class Logo {
  @Input() color: string = environment.primary[500];
  @Input() size: number = 150;

}
