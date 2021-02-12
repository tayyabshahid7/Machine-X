import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
// dtOptions: DataTables.Settings = {};

  constructor(private route: ActivatedRoute,
              private router: Router ) { }
  currentStep = 0;
  email = '';
  companyLegalName = '';
  LegalBusinessName = '';
  EIN = '';
  date = null;
  dateFormat = 'MM/dd/yyyy';

  passwordVisible = false;
  RememberMechecked = true;
  passwordString: String;
  panels = [
    {
      active: true,
      name: 'Bank Account',
      disabled: false,
      icon: 'bank'
    },
    {
      active: false,
      disabled: false,
      name: 'Card',
      icon: 'dollar'

    }
  ];
  steps = [
    {
      name: 'Registration',
      status: 'In Progress'
    },
    {
      name: 'Legal Information',
      status: 'Waiting'
    },
    {
      name: 'Business Details',
      status: 'Waiting'

    },
    {
      name: 'Payout Options',
      status: 'Waiting'

    },
    {
      name: 'Representatives',
      status: 'Waiting'
    },
    {
      name: 'Business Owners',
      status: 'Waiting'
    }, {
      name: 'Additional Documents',
      status: 'Waiting'
    },
     {
      name: 'Summary',
      status: 'Waiting'
    },
     {
      name: 'Done',
      status: 'Waiting'
    }
];

ownerTableData = [
  {
    name: 'Jhon Smith',
    email: 'Jhon.Smith@email.com'
  }
];
newOwnerFirstName = '';
newOwnerLastName = '';
newOwnerEmail = '';
deleteOwner(){
  if (this.ownerTableData.length > 0){
    this.ownerTableData.pop();
  }
}

addOwner(){
  const newName = this.newOwnerFirstName + this.newOwnerLastName;
  this.ownerTableData.push(
    {
      name: newName,
      email: this.newOwnerEmail
});

  this.newOwnerFirstName = '';
  this.newOwnerLastName = '';
  this.newOwnerEmail = '';
}

  ngOnInit(): void {
    this.currentStep = 0;

  }

    NextStep(){

      if (this.currentStep < this.steps.length - 1){
        this.currentStep = this.currentStep + 1;
        this.steps[this.currentStep].status = 'In Progress';
        this.steps[this.currentStep - 1].status = 'Done';
      }else{
        console.log('more than 8 !');

      }
      console.log(this.currentStep);

    }
    backStep(){
      if (this.currentStep > 0){
      this.currentStep = this.currentStep - 1;
      this.steps[this.currentStep].status = 'In Progress';
      this.steps[this.currentStep + 1].status = 'Waiting';
      }else{
        console.log('less than 0');
            }
    }

    goToDashboard(){
      this.router.navigate(['/dashboard/home']);
    }
}
