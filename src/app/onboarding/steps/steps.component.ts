import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import {BusinessOwnersInterface, MachineInterface} from '../../models/machine';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {NgxSpinnerService} from 'ngx-spinner';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {coerceStringArray} from '@angular/cdk/coercion';
import {UserAPIService} from '../../services/api/user-api.service';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  fileList: NzUploadFile[] = [];
  loading = false;
  form: FormGroup;
  bForm: FormGroup;
  currentStep = 0;
  date = null;
  dateFormat = 'MM/dd/yyyy';
  passwordVisible = false;
  passwordString: string;
  bankSelected = false;
  cardSelected = false;
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
  validationMessages = {
    email: 'Email field shouldn’t be empty!',
    password: 'Password field shouldn’t be empty!',
    passwordLen: 'Password length should be at least 6!',
    emailInvalid: 'Not valid email!',
    companyLegalName: 'Company Legal Name is Required!',
    countrylegal: 'Country is Required!',
    stripeAccept: 'Accepting Stripe Terms and Conditions is a must!',
    blegalName: 'Legal Business Name is Required!',
    bEIN: 'EIN is Required!',
    bCity: 'City is Required!',
    bAddressline1: 'Address Line 1 is Required!',
    bAddressline2: 'Address Line 2 is Required!',
    bState: 'State is Requires!',
    bZip: 'Zip Code is Required!',
    bPhoneNo: 'Business Phone Number is Required!',
    bPhoneNoPattern: 'Not valid Phone Number!',
    bIndustry: 'Industry is Required!',
    bnkAccName: 'Account Holder Name is Required!',
    bnkAccNo: 'Account Number is Required!',
    bnkRoutNo: 'Wire Routing Number is Required!',
    bnkCur: 'Currency is Required!',
    bnkName: 'Bank Name is Required!',
    bnkAddress: 'Bank Address is Required!',
    cardHolderName: 'Bank Holder Name is Required!',
    CardNumber: 'Card Number is Required!',
    CardExp: 'Card Expiry is Required!',
    CardExpInv: 'Invalid Exp Date!',
    CardInvalid: 'Not Valid Card Number!',
    legalFirstName: 'First Name is Required!',
    legalLastName: 'Last Name is Required!',
    legalEmail: 'Email is Required!',
    legalEmailInvalid: 'Not Valid Email Address!',
    legalJobTitle: 'Job Title is Required!',
    legalDOB: 'Date of Birth is Required!',
    legalAddress1: 'Address 1 is Required!',
    legalAddress2: 'Address 2 is Required!',
    legalCity: 'City is Required!',
    legaState: 'State is Required!',
    legalZipCode: 'Zip Code is Required!',
    legalPhoneNo: 'Phone Number is Required!',
    legalPhoneNoInvalid: 'Invalid Phone Number!',
    legalSSN: 'SSN is Required!',
    ownerEmail: 'Email is Required!',
    ownerEmailInvalid: 'Not Valid Email!',
    ownerFirst: 'First Name is Required!',
    ownerLast: 'Last Name is Required!',
    ownerConfirm: 'Confirm 25% Ownership is a must',
  };
  ownerTableData = [];
  newOwnerFirstName = '';
  newOwnerLastName = '';
  newOwnerEmail = '';
  machine: MachineInterface;
  owners: BusinessOwnersInterface[] = [];
  owner: BusinessOwnersInterface;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private errorHandlerService: ErrorHandlerService,
              private userApiService: UserAPIService,
              public datepipe: DatePipe) {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      companyLegalName: ['', [Validators.required]],
      countrylegal: ['', [Validators.required]],
      stripeAccept: ['false', [Validators.requiredTrue]],
      blegalName: ['', [Validators.required]],
      bEIN: ['', [Validators.required]],
      bDBA: [''],
      bAddressline1: ['', [Validators.required]],
      bAddressline2: ['', [Validators.required]],
      bCity: ['', [Validators.required]],
      bState: ['', [Validators.required]],
      bZip: ['', [Validators.required]],
      bPhoneNo: ['', [Validators.required, Validators.pattern('^\\d{3}[\\-]\\d{3}[\\-]\\d{4}')]],
      bIndustry: ['', [Validators.required]],
      Bwebsite: [''],
      bankPayout: ['false'],
      bnkAccName: ['', [Validators.required]],
      bnkAccNo: ['', [Validators.required]],
      bnkRoutNo: ['', [Validators.required]],
      bnkCur: ['', [Validators.required]],
      bnkName: ['', [Validators.required]],
      bnkAddress: ['', [Validators.required]],
      cardPayout: ['false'],
      cardHolderName: ['', [Validators.required]],
      CardNumber: ['', [Validators.required , Validators.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$')]],
      CardExp: ['', [Validators.required , Validators.pattern('^((0[1-9])|(1[0-2]))\\/(\\d{2})$')]],
      legalFirstName: ['', [Validators.required]],
      legalLastName: ['', [Validators.required]],
      legalEmail: ['', [Validators.required , Validators.email]],
      legalJobTitle: ['', [Validators.required]],
      legalDOB: ['', [Validators.required]],
      legalAddress1: ['', [Validators.required]],
      legalAddress2: ['', [Validators.required]],
      legalCity: ['', [Validators.required]],
      legaState: ['', [Validators.required]],
      legalZipCode: ['', [Validators.required]],
      legalPhoneNo: ['', [Validators.required, Validators.pattern('^\\d{3}[\\-]\\d{3}[\\-]\\d{4}')]],
      legalSSN: ['', [Validators.required]],
      attachments: [null, Validators.required],
    });
    this.bForm = this.formBuilder.group({
      ownerEmail: ['', [Validators.required, Validators.email]],
      ownerFirst: ['', [Validators.required]],
      ownerLast: ['', [Validators.required]],
      ownerConfirm: ['false', [Validators.requiredTrue]],

    });
  }

deleteOwner(data){
  if (this.ownerTableData.length > 0){
    this.ownerTableData.splice(this.ownerTableData.indexOf(data), 1);
    const index = this.owners.findIndex(s => s.email === data.email);
    this.owners.splice(index, 1);
  }
}

addOwner(){
  const newName = this.newOwnerFirstName + this.newOwnerLastName;
  this.ownerTableData.push(
    {
      name: newName,
      email: this.newOwnerEmail
});
  this.owner = {
    email: this.newOwnerEmail,
    firstName: this.newOwnerFirstName,
    lastName: this.newOwnerLastName
  };
  this.owners.push(this.owner);
  this.newOwnerFirstName = '';
  this.newOwnerLastName = '';
  this.newOwnerEmail = '';
}

  ngOnInit(): void {
    this.currentStep = 0;
    this.subscribeOnFormChanges(this.form);
  }

  subscribeOnFormChanges(formName): void {
    formName.valueChanges.subscribe(val => {
      this.bankSelected = val.bankPayout === true ? true : false;
      this.cardSelected = val.cardPayout === true ? true : false;
    });
  }

  onSubmit(formName) {
    if (true) {
    } else {
      for (const inner in formName.controls) {
        if (formName.controls.hasOwnProperty(inner)) {
          formName.get(inner).markAsTouched();
        }
      }
    }

  }
  NextStep(){
    if (this.currentStep < this.steps.length - 1){
      this.currentStep = this.currentStep + 1;
      this.steps[this.currentStep].status = 'In Progress';
      this.steps[this.currentStep - 1].status = 'Done';
      if ( this.steps[this.currentStep].name === 'Done')
      {
        this.machine = {
          username: this.form.get('companyLegalName').value,
          email: this.form.get('email').value,
          password: this.form.get('password').value,
          companyLegalName: this.form.get('companyLegalName').value,
          country: this.form.get('countrylegal').value,
          termsAgreeIp: '0.0.0.0',
          legalBusinessName: this.form.get('blegalName').value,
          einNumber: this.form.get('bEIN').value,
          doingBusinessAs: this.form.get('bDBA').value,
          addressLine1: this.form.get('bAddressline1').value,
          addressLine2: this.form.get('bAddressline2').value,
          city: this.form.get('bCity').value,
          zipCode: this.form.get('bZip').value,
          businessPhoneNumber: this.form.get('bPhoneNo').value,
          industry: this.form.get('bIndustry').value,
          businessWebsite: this.form.get('Bwebsite').value,
          representativeFirstName: this.form.get('legalFirstName').value,
          representativeLastName: this.form.get('legalLastName').value,
          representativeEmail: this.form.get('legalEmail').value,
          representativeJobTitle: this.form.get('legalJobTitle').value,
          representativeDob: this.datepipe.transform(this.form.get('legalDOB').value, 'yyyy-MM-dd'),
          representativeAddressLine1: this.form.get('legalAddress1').value,
          representativeAddressLine2: this.form.get('legalAddress2').value,
          representativeCity: this.form.get('legalCity').value,
          representativeZip: this.form.get('legalZipCode').value,
          representativePhoneNumber: this.form.get('legalPhoneNo').value,
          representativeSsn: this.form.get('legalSSN').value,
          businessOwners: this.owners,
          attachments: this.form.get('attachments').value,
          defaultPayoutType: this.cardSelected === true ? 'card' : 'bank',
          bank_account_number: this.form.get('bnkAccName').value,
          bank_account_routing_number: this.form.get('bnkRoutNo').value,
          bank_account_currency: this.form.get('bnkCur').value,
          bank_account_bank_name: this.form.get('bnkName').value,
          bank_account_holder_name: this.form.get('bnkAccName').value,
          bank_account_address: this.form.get('bnkAddress').value,
          card_holder_name: this.form.get('cardHolderName').value,
          card_number: this.form.get('CardNumber').value,
          card_expiry_date: this.form.get('CardExp').value,
          externalId: '-',
          connectedAccountStatus: 'waiting_verification'
        };
        this.userApiService.addMachineshopUser(this.machine).subscribe(
            response => {
            // --  this.notification.success('Part added successfully', null);
            // --  this.spinner.hide('addPartSpinner');
              this.loading = false;
            },
            error => {
              // TODO: review how to show error here
              if (error.hasOwnProperty('error')) {
                this.errorHandlerService.setFormAPIErrors(this.form, error.error);
              }
              // -- this.spinner.hide('addPartSpinner');
             //  this.notification.error('Error while adding part', null);
              this.loading = false;
            }
        );
      }
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
      this.router.navigate(['/login']);
    }

  beforeUpload(file: NzUploadFile): boolean {
    this.fileList = this.fileList.concat(file);
    this.form.controls.attachments.setValue(this.fileList);
    this.form.controls.attachments.markAsTouched();
    this.form.controls.attachments.markAsDirty();
    return false;
  }

  removeFile(file: NzUploadFile): boolean {
    this.fileList = this.fileList.filter(f => f.uid !== file.uid);
    if (this.fileList.length > 0) {
      this.form.controls.attachments.setValue(this.fileList);
    } else {
      this.form.controls.attachments.setValue(null);
    }
    return true;
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get companyLegalName() { return this.form.get('companyLegalName'); }
  get countrylegal() { return this.form.get('countrylegal'); }
  get stripeAccept() { return this.form.get('stripeAccept'); }
  get blegalName() { return this.form.get('blegalName'); }
  get bEIN() { return this.form.get('bEIN'); }
  get bDBA() { return this.form.get('bDBA'); }
  get bAddressline1() { return this.form.get('bAddressline1'); }
  get bAddressline2() { return this.form.get('bAddressline2'); }
  get bCity() { return this.form.get('bCity'); }
  get bState() { return this.form.get('bState'); }
  get bZip() { return this.form.get('bZip'); }
  get bIndustry() { return this.form.get('bIndustry'); }
  get bPhoneNo() { return this.form.get('bPhoneNo'); }
  get Bwebsite() { return this.form.get('Bwebsite'); }
  get bnkAccName() { return this.form.get('bnkAccName'); }
  get bnkAccNo() { return this.form.get('bnkAccNo'); }
  get bnkRoutNo() { return this.form.get('bnkRoutNo'); }
  get bnkCur() { return this.form.get('bnkCur'); }
  get bnkName() { return this.form.get('bnkName'); }
  get bnkAddress() { return this.form.get('bnkAddress'); }
  get cardHolderName() { return this.form.get('cardHolderName'); }
  get CardNumber() { return this.form.get('CardNumber'); }
  get CardExp() { return this.form.get('CardExp'); }
  get legalFirstName() { return this.form.get('legalFirstName'); }
  get legalLastName() { return this.form.get('legalLastName'); }
  get legalEmail() { return this.form.get('legalEmail'); }
  get legalJobTitle() { return this.form.get('legalJobTitle'); }
  get legalDOB() { return this.form.get('legalDOB'); }
  get legalAddress1() { return this.form.get('legalAddress1'); }
  get legalAddress2() { return this.form.get('legalAddress2'); }
  get legalCity() { return this.form.get('legalCity'); }
  get legaState() { return this.form.get('legaState'); }
  get legalZipCode() { return this.form.get('legalZipCode'); }
  get legalPhoneNo() { return this.form.get('legalPhoneNo'); }
  get legalSSN() { return this.form.get('legalSSN'); }
  get ownerEmail() { return this.form.get('ownerEmail'); }
  get ownerFirst() { return this.form.get('ownerFirst'); }
  get ownerLast() { return this.form.get('ownerLast'); }
  get ownerConfirm() { return this.form.get('ownerConfirm'); }

}
