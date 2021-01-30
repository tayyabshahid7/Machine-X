import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rfqs',
  templateUrl: './rfqs.component.html',
  styleUrls: ['./rfqs.component.css']
})
export class RFQsComponent implements OnInit {
 tableData = [
   {
     'id' : " 112938",
     'name':'Part XXX-XXX-XXX - Revision D',
     'date':'March 4, 2018',
     'submission':'2',
     'timer':'2',
     'status':true,
     'isActive':"active"
   },
   {
    'id' : "112098",
    'name':'Part XXX - Revision A',
    'date':'April 6, 2014',
    'submission':'0',
    'timer':'2',
    'status':true,
    'isActive':"active"
  },
  {
    'id' : "21232",
    'name':'Part XXX - Revision X',
    'date':'April 6, 2015',
    'submission':'1',
    'timer':'1',
    'status':false,
    'isActive':"NotActive"
  },
  {
    'id' : "21232",
    'name':'Part XXX - Revision X',
    'date':'April 6, 2015',
    'submission':'1',
    'timer':'1',
    'status':false,
    'isActive':"NotActive"
  },{
    'id' : "21232",
    'name':'Part XXX - Revision X',
    'date':'April 6, 2015',
    'submission':'1',
    'timer':'1',
    'status':false,
    'isActive':"NotActive"
  },{
    'id' : "21232",
    'name':'Part XXX - Revision X',
    'date':'April 6, 2015',
    'submission':'1',
    'timer':'1',
    'status':false,
    'isActive':"NotActive"
  },{
    'id' : "21232",
    'name':'Part XXX - Revision X',
    'date':'April 6, 2015',
    'submission':'1',
    'timer':'1',
    'status':false,
    'isActive':"NotActive"
  },{
    'id' : "21232",
    'name':'Part XXX - Revision X',
    'date':'April 6, 2015',
    'submission':'1',
    'timer':'1',
    'status':false,
    'isActive':"NotActive"
  }


];
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  onSelect(data){
    console.log(data.isActive);
      this.router.navigate(['dashboard/RFQ/RFQDetails',data.isActive]);
    }
  
}
