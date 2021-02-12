import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cost = 1630.0;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  paymenConfirmation(){
    this.router.navigate(['/dashboard/RFQ/RFQDetails/active/viewquote/paymentConfirmation']);
  }

}
