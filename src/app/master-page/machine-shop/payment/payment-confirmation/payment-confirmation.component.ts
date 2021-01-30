import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit {
  tableData=[{
    'job':'job #3',
    'RFQ':'RFQ-112938',
    'QT':'QT-2308',
  },];

  receivers=[];
  addEmail(){
    this.receivers.push(1);
  }
  removeEmail(){
    this.receivers.pop();
  }

  constructor(private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
  }
  backToJobs(){
    this.router.navigate(['/dashboard/Jobs']);

  }
}
