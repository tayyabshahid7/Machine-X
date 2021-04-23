import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './landing-page/login/login.component';
import { PasswordRecoveryComponent } from './landing-page/password-recovery/password-recovery.component';
import { NewPasswordComponent } from './landing-page/new-password/new-password.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { NewRFQComponent } from './new-rfq/new-rfq.component';
import { RfqDetailsComponent } from './new-rfq/rfq-details/rfq-details.component';
import { GenerateQuoteComponent } from './new-rfq/generate-quote/generate-quote.component';
import { ReviewSubmitComponent } from './new-rfq/review-submit/review-submit.component';
import { SubmittedQuoteComponent } from './submitted-quote/submitted-quote.component';
import { SubmittedDetailsComponent } from './submitted-quote/submitted-details/submitted-details.component';
import { QuoteInvoiceSubmittedComponent } from './submitted-quote/quote-invoice-submitted/quote-invoice-submitted.component';
import { WorkingJobComponent } from './working-job/working-job.component';
import { WorkingJobDetailsComponent } from './working-job/working-job-details/working-job-details.component';
import { DashboardComponent } from './master-page/dashboard/dashboard.component';
import { JobsComponent } from './master-page/machine-shop/jobs/jobs.component';
import { JobsDetailsComponent } from './master-page/machine-shop/jobs/jobs-details/jobs-details.component';
import { JobDetailsComponent } from './master-page/machine-shop/jobs/job-details/job-details.component';
import { InvoiceComponent } from './master-page/machine-shop/jobs/job-details/invoice/invoice.component';
import { TransactionHistoryComponent } from './master-page/transaction-history/transaction-history.component';
import { ReceiptComponent } from './master-page/transaction-history/receipt/receipt.component';
import { ProfileComponent } from './master-page/profile/profile.component';
import { TermsComponent } from './master-page/terms/terms.component';
import { AuthGuard } from './utilities/auth.utilities/auth.guard';
import { AppGuard } from './utilities/auth.utilities/app.guard';


const routes: Routes = [
  {path: '', component: LandingPageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'forgotpassword', component: PasswordRecoveryComponent, canActivate: [AuthGuard]},
  {path: 'newpassword', component: NewPasswordComponent, canActivate: [AuthGuard]},
  {path: 'Onboarding', component: OnboardingComponent, canActivate: [AuthGuard]},
  {
    path: 'dashboard',
    component: MasterPageComponent,
    canActivate: [AppGuard],
    canLoad: [AppGuard],
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: DashboardComponent},
      {path: 'newRFQ', component: NewRFQComponent},
      {path: 'newRFQ/details/:rfqId/:displayId', component: RfqDetailsComponent, data: {label: 'Request for Quotation / '}},
      {path: 'newRFQ/details/:rfqId/:displayId/apply', component: GenerateQuoteComponent, data: {label: 'Request for Quotation / Generate Quote'}},
      {path: 'newRFQ/details/:rfqIds', component: GenerateQuoteComponent},
      {path: 'newRFQ/details/:rfqId/:displayId/submit', component: ReviewSubmitComponent, data: {label: 'Request for Quotation / Generate Quote / Review'}},
      {path: 'submittedQuote', component: SubmittedQuoteComponent},
      {path: 'submittedQuote/details/:quoteId/:displayId', component: SubmittedDetailsComponent, data: {label: 'Quote / Details '}},
      {path: 'submittedQuoteInvoice/:quoteId/invoice', component: QuoteInvoiceSubmittedComponent, data: {label: 'Quote / Details / Invoice'}},
      {path: 'WorkingJobs', component: WorkingJobComponent},
      {path: 'WorkingJobs/details/:jobId/:jobDisplayId', component: WorkingJobDetailsComponent, data: {label: 'Job / Details'}},
      // {path: 'parts', component: PartsComponent},
      // {path: 'parts/add', component: PartDetailsComponent},
      // {path: 'parts/view', component: PartEditComponent},
      // {path: 'parts/view/addrevision', component: AddRevisionComponent},
      // {path: 'RFQ', component: RFQsComponent},
      // {path: 'RFQ/Add', component: AddRfqComponent},
      // {path: 'RFQ/Add/confirm', component: SubmitRfqComponent},
      // {path: 'RFQ/RFQDetails', component: RfqDetailsComponent},
      // {path: 'RFQ/RFQDetails/:active', component: RfqDetailsComponent},
      // {path: 'RFQ/RFQDetails/active/viewquote', component: ViewQuoteComponent},
      // {path: 'RFQ/RFQDetails/NotActive/viewquote', component: ExpQuoteComponent},
      // {path: 'RFQ/RFQDetails/active/viewquote/payment', component: PaymentComponent},
      // {path: 'RFQ/RFQDetails/active/viewquote/paymentConfirmation', component: PaymentConfirmationComponent},
      // {path: 'Jobs', component: JobsComponent},
      // {path: 'Jobs/jobDetails/:status', component: JobsDetailsComponent},
      // {path: 'Jobs/jobDetails/', component: JobsDetailsComponent},
      // {path: 'Jobs/jobDetail/:status', component: JobDetailsComponent},
      // {path: 'Jobs/invoice', component: InvoiceComponent},
      {path: 'transactions', component: TransactionHistoryComponent},
      {path: 'transactions/receipt/:quoteId', component: QuoteInvoiceSubmittedComponent},
      // {path: 'transactions/receipt', component: ReceiptComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'terms', component: TermsComponent}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
