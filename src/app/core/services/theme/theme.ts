import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {

  setDefault() {
    const theme = localStorage.getItem('theme');

     if (!theme) {
       const isdark = window.matchMedia('(prefers-color-scheme: dark)').matches
       if (isdark) {
         this.set('dark');
       } else {
         this.set('light');
       }
     } else {
       this.set(theme); }
   }

  get(): string {
    return localStorage.getItem('theme')!;
  }

   set(theme: string) {
     const element = document.querySelector('html');
     if (!element) return;

     if (theme == 'dark'){
       localStorage.setItem('theme', theme);
       element.classList.add(theme);
     } else {
       element.classList.remove('dark');
       localStorage.setItem('theme', theme);
     }

   }

}
