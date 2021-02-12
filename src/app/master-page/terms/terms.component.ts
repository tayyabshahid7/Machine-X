import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  scroll = true;
  constructor() { }

  ngOnInit(): void {
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
  // In chrome and some browser scroll is given to body tag
  const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  const max = document.documentElement.scrollHeight;
  // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
  if (pos == max )   {
   // Do your action here
   this.scroll = false;
   }
  }
}
