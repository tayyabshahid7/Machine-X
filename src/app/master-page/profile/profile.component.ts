import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getUser } from '../../store/user/user.selectors';
import { ShopProfileInterface } from '../../models/user.models';
import { filter } from 'rxjs/operators';
import { UserAPIService } from '../../services/api/user-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  shopProfile: ShopProfileInterface;
  shopProfilePayOutForm: FormGroup;
  dateFormat = 'MM.dd.yyyy';

  constructor(
    private msg: NzMessageService,
    private formBuilder: FormBuilder,
    private store: Store,
    private userAPIService: UserAPIService,
    private errorHandlerService: ErrorHandlerService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.store.select(getUser)
      .pipe(filter(d => d !== null))
      .subscribe(userProfile => {
        this.shopProfile = userProfile;
        this.initForm(this.shopProfile);
        this.spinner.hide();
      });
  }

  initForm(shopForm: ShopProfileInterface) {
    this.shopProfilePayOutForm = this.formBuilder.group({
      // defaultPayoutType: [shopForm.defaultPayoutType, [Validators.required]],
      bankAccountHolderName: [shopForm.bankAccountHolderName, [Validators.required]],
      bankAccountNumber: [shopForm.bankAccountNumber, [Validators.required]],
      bankAccountRoutingNumber: [shopForm.bankAccountRoutingNumber, [Validators.required]],
      bankAccountCurrency: [shopForm.bankAccountCurrency, [Validators.required]],
      bankAccountBankName: [shopForm.bankAccountBankName, [Validators.required]],
      bankAccountAddress: [shopForm.bankAccountAddress, [Validators.required]],
      cardHolderName: [shopForm.cardHolderName, [Validators.required]],
      cardNumber: [shopForm.cardNumber, [Validators.required]],
      cardExpiryDate: [shopForm.cardExpiryDate, [Validators.required]],
    });
  }

  saveChanges() {
    if (this.shopProfilePayOutForm.valid) {
      this.spinner.show();
      this.userAPIService.updatePayoutInfo(this.shopProfilePayOutForm.value).subscribe(
        res => {
          this.spinner.hide();
          this.msg.success('Saved changes');
        },
        error => {
          if (error.hasOwnProperty('error')) {
            this.errorHandlerService.setFormAPIErrors(this.shopProfilePayOutForm, error.error);
          }
          this.spinner.hide();
          this.msg.error('Error Saving changes');
        }
      );
      ;
    }
  }

}
