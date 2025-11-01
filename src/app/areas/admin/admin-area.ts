import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Layout } from '@app/shared/layout/layout';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.html',
  imports: [Layout, RouterOutlet]
})
export class AdminArea {
  //
}
