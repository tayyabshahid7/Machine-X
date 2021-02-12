import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input/';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './landing-page/login/login.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { PasswordRecoveryComponent } from './landing-page/password-recovery/password-recovery.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { PartsComponent } from './master-page/parts/parts.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { PartDetailsComponent } from './master-page/part-details/part-details.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { PartEditComponent } from './master-page/part-edit/part-edit.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzResultModule } from 'ng-zorro-antd/result';
import { AddRevisionComponent } from './master-page/add-revision/add-revision.component';
import { RFQsComponent } from './master-page/machine-shop/rfqs/rfqs.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { RfqDetailsComponent } from './new-rfq/rfq-details/rfq-details.component';
import { ViewQuoteComponent } from './master-page/machine-shop/view-quote/view-quote.component';
import { PaymentComponent } from './master-page/machine-shop/payment/payment.component';
import { PaymentConfirmationComponent } from './master-page/machine-shop/payment/payment-confirmation/payment-confirmation.component';
import { AddRfqComponent } from './master-page/machine-shop/add-rfq/add-rfq.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { SubmitRfqComponent } from './master-page/machine-shop/add-rfq/submit-rfq/submit-rfq.component';
import { ExpQuoteComponent } from './master-page/machine-shop/view-quote/exp-quote/exp-quote.component';
import { JobsComponent } from './master-page/machine-shop/jobs/jobs.component';
import { JobsDetailsComponent } from './master-page/machine-shop/jobs/jobs-details/jobs-details.component';
import { JobDetailsComponent } from './master-page/machine-shop/jobs/job-details/job-details.component';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { ProfileComponent } from './master-page/profile/profile.component';
import { TransactionHistoryComponent } from './master-page/transaction-history/transaction-history.component';
import { ReceiptComponent } from './master-page/transaction-history/receipt/receipt.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { DashboardComponent } from './master-page/dashboard/dashboard.component';
import { NewPasswordComponent } from './landing-page/new-password/new-password.component';
import { InvoiceComponent } from './master-page/machine-shop/jobs/job-details/invoice/invoice.component';
import { TableModule } from 'ngx-easy-table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { TermsComponent } from './master-page/terms/terms.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { StepsComponent } from './onboarding/steps/steps.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NewRFQComponent } from './new-rfq/new-rfq.component';
import { ReviewSubmitComponent } from './new-rfq/review-submit/review-submit.component';
import { GenerateQuoteComponent } from './new-rfq/generate-quote/generate-quote.component';
import { SubmittedQuoteComponent } from './submitted-quote/submitted-quote.component';
import { SubmittedDetailsComponent } from './submitted-quote/submitted-details/submitted-details.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { QuoteInvoiceSubmittedComponent } from './submitted-quote/quote-invoice-submitted/quote-invoice-submitted.component';
import { WorkingJobComponent } from './working-job/working-job.component';
import { WorkingJobDetailsComponent } from './working-job/working-job-details/working-job-details.component';

registerLocaleData(en);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};


const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    PasswordRecoveryComponent,
    MasterPageComponent,
    PartsComponent,
    PartDetailsComponent,
    PartEditComponent,
    AddRevisionComponent,
    RFQsComponent,
    RfqDetailsComponent,
    ViewQuoteComponent,
    PaymentComponent,
    PaymentConfirmationComponent,
    AddRfqComponent,
    SubmitRfqComponent,
    ExpQuoteComponent,
    JobsComponent,
    JobDetailsComponent,
    ProfileComponent,
    TransactionHistoryComponent,
    ReceiptComponent,
    DashboardComponent,
    NewPasswordComponent,
    InvoiceComponent,
    TermsComponent,
    OnboardingComponent,
    StepsComponent,
    NewRFQComponent,
    ReviewSubmitComponent,
    GenerateQuoteComponent,
    SubmittedQuoteComponent,
    SubmittedDetailsComponent,
    QuoteInvoiceSubmittedComponent,
    WorkingJobComponent,
    WorkingJobDetailsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzAffixModule,
    NzAlertModule,
    NzAnchorModule,
    NzAutocompleteModule,
    NzAvatarModule,
    NzBackTopModule,
    NzBadgeModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzCalendarModule,
    NzCardModule,
    NzInputModule,
    NzIconModule,
    NzDropDownModule,
    NzSelectModule,
    NzLayoutModule,
    NzCheckboxModule,
    NzPageHeaderModule,
    NzGridModule,
    NzPaginationModule,
    NzNotificationModule,
    NzModalModule,
    NzUploadModule,
    NzListModule,
    NzDividerModule,
    NzResultModule,
    NzTableModule,
    NzTagModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzCommentModule,
    NzTimelineModule,
    NzRateModule,
    NzMessageModule,
    TableModule,
    NzSwitchModule,
    NzProgressModule,
    NzStepsModule,
    NzCollapseModule,
    NzTabsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
