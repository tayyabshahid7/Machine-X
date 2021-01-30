import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submitted-quote',
  templateUrl: './submitted-quote.component.html',
  styleUrls: ['./submitted-quote.component.css']
})
export class SubmittedQuoteComponent implements OnInit {
  tableData = [
    {
      'id' : " QT-112938",
      'name':'Part XXX-XXX-XXX - Revision D',
      'date':'March 4, 2018',
      'submission':'2',
      'cost':'80.00',
      'status':"ava",
      'isActive':"active"
    },
    {
     'id' : "QT-112098",
     'name':'Part XXX - Revision A',
     'date':'April 6, 2014',
     'submission':'0',
     'cost':'25.00',
     'status':"ava",
     'isActive':"active"
   },
   {
     'id' : "QT-21232",
     'name':'Part XXX - Revision X',
     'date':'April 6, 2015',
     'submission':'1',
     'cost':'90.00',
     'status':"ava",
     'isActive':"NotActive"
   },
   {
     'id' : "QT-21232",
     'name':'Part XXX - Revision X',
     'date':'April 6, 2015',
     'submission':'1',
     'cost':'40.00',
     'status':"pen",
     'isActive':"NotActive"
   },{
     'id' : "QT-21232",
     'name':'Part XXX - Revision X',
     'date':'April 6, 2015',
     'submission':'1',
     'cost':'50.00',
     'status':"pen",
     'isActive':"NotActive"
   },{
     'id' : "QT-21232",
     'name':'Part XXX - Revision X',
     'date':'April 6, 2015',
     'submission':'1',
     'cost':'100.00',
     'status':"ex",
     'isActive':"NotActive"
   },{
     'id' : "QT-21232",
     'name':'Part XXX - Revision X',
     'date':'April 6, 2015',
     'submission':'1',
     'cost':'30.00',
     'status':"ex",
     'isActive':"NotActive"
   },{
     'id' : "QT-21232",
     'name':'Part XXX - Revision X',
     'date':'April 6, 2015',
     'submission':'1',
     'cost':'200.00',
     'status':"ex",
     'isActive':"NotActive"
   }
 
 
 ];
 constructor(private router : Router) { }

 ngOnInit(): void {
 }

 onSelect(data){
   console.log(data.status);
     this.router.navigate(['dashboard/submittedQuote/details',data.status]);
   }
 

}
