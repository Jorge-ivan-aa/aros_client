import { Component, inject } from '@angular/core';
import { Theme } from '@app/core/services/theme/theme';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-dark-mode-button',
  imports: [ButtonModule],
  templateUrl: './dark-mode-button.html',
  styles: ``,
})

export class DarkModeButton {
  private theme = inject(Theme);
  icon = "";

  constructor() {
    this.setDefaultIcon();
  }

  setDefaultIcon() {
    const currentTheme = this.theme.get()
    if (currentTheme == "dark") {
      this.icon = "pi pi-moon"

    } else {
      this.icon = "pi pi-sun"
    }
  }

  toggleDarkMode() {
    const currentTheme = this.theme.get()
    if (currentTheme == "dark") {
      this.theme.set("light");
      this.icon = "pi pi-sun"

    } else {
      this.theme.set("dark");
      this.icon = "pi pi-moon"
    }
  }
}
