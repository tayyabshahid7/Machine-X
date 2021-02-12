import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {LoginComponent} from './landing-page/login/login.component';
import {PasswordRecoveryComponent} from './landing-page/password-recovery/password-recovery.component';
import {NewPasswordComponent} from './landing-page/new-password/new-password.component';
import {OnboardingComponent} from './onboarding/onboarding.component';
import {MasterPageComponent} from './master-page/master-page.component';
import {NewRFQComponent} from './new-rfq/new-rfq.component';
import {RfqDetailsComponent} from './new-rfq/rfq-details/rfq-details.component';
import {GenerateQuoteComponent} from './new-rfq/generate-quote/generate-quote.component';
import {ReviewSubmitComponent} from './new-rfq/review-submit/review-submit.component';
import {SubmittedQuoteComponent} from './submitted-quote/submitted-quote.component';
import {SubmittedDetailsComponent} from './submitted-quote/submitted-details/submitted-details.component';
import {QuoteInvoiceSubmittedComponent} from './submitted-quote/quote-invoice-submitted/quote-invoice-submitted.component';
import {WorkingJobComponent} from './working-job/working-job.component';
import {WorkingJobDetailsComponent} from './working-job/working-job-details/working-job-details.component';
import {PartsComponent} from './master-page/parts/parts.component';
import {DashboardComponent} from './master-page/dashboard/dashboard.component';
import {PartDetailsComponent} from './master-page/part-details/part-details.component';
import {PartEditComponent} from './master-page/part-edit/part-edit.component';
import {AddRevisionComponent} from './master-page/add-revision/add-revision.component';
import {RFQsComponent} from './master-page/machine-shop/rfqs/rfqs.component';
import {AddRfqComponent} from './master-page/machine-shop/add-rfq/add-rfq.component';
import {SubmitRfqComponent} from './master-page/machine-shop/add-rfq/submit-rfq/submit-rfq.component';
import {ViewQuoteComponent} from './master-page/machine-shop/view-quote/view-quote.component';
import {ExpQuoteComponent} from './master-page/machine-shop/view-quote/exp-quote/exp-quote.component';
import {PaymentComponent} from './master-page/machine-shop/payment/payment.component';
import {PaymentConfirmationComponent} from './master-page/machine-shop/payment/payment-confirmation/payment-confirmation.component';
import {JobsComponent} from './master-page/machine-shop/jobs/jobs.component';
import {JobsDetailsComponent} from './master-page/machine-shop/jobs/jobs-details/jobs-details.component';
import {JobDetailsComponent} from './master-page/machine-shop/jobs/job-details/job-details.component';
import {InvoiceComponent} from './master-page/machine-shop/jobs/job-details/invoice/invoice.component';
import {TransactionHistoryComponent} from './master-page/transaction-history/transaction-history.component';
import {ReceiptComponent} from './master-page/transaction-history/receipt/receipt.component';
import {ProfileComponent} from './master-page/profile/profile.component';
import {TermsComponent} from './master-page/terms/terms.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgotpassword', component: PasswordRecoveryComponent},
  {path: 'newpassword', component: NewPasswordComponent},
  {path: 'Onboarding' , component: OnboardingComponent},

  {

    path: 'dashboard',
    component: MasterPageComponent,
    children: [
      {
        path: 'newRFQ',
        component: NewRFQComponent
      },
      {
        path: 'newRFQ/details',
        component: RfqDetailsComponent
      },
      {
        path: 'newRFQ/details/apply',
        component: GenerateQuoteComponent
      },
      {
        path: 'newRFQ/details/submit',
        component: ReviewSubmitComponent
      },
      {
        path: 'submittedQuote',
        component: SubmittedQuoteComponent
      },
      {
        path: 'submittedQuote/details/:status',
        component: SubmittedDetailsComponent,
      },
      {
        path: 'submittedQuote/details/:status/invoice',
        component: QuoteInvoiceSubmittedComponent
      },
      {
        path: 'WorkingJobs',
        component: WorkingJobComponent
      },
      {
        path: 'WorkingJobs/details/:status',
        component: WorkingJobDetailsComponent

      },
      {
        path: 'parts', // child route path
        component: PartsComponent,
        // child route component that the router renders
      },
      {
        path: 'home',
        component: DashboardComponent,
      },
      {
        path: 'parts/add',
        component: PartDetailsComponent, // another child route component that the router renders
      },
      {
        path: 'parts/view',
        component: PartEditComponent, // another child route component that the router renders
      },
      {
        path: 'parts/view/addrevision',
        component: AddRevisionComponent
      },
      {
        path: 'RFQ',
        component: RFQsComponent
      },
      {
        path: 'RFQ/Add',
        component: AddRfqComponent
      },
      {
        path: 'RFQ/Add/confirm',
        component: SubmitRfqComponent
      },
      {
        path: 'RFQ/RFQDetails',
        component: RfqDetailsComponent
      },
      {
        path: 'RFQ/RFQDetails/:active',
        component: RfqDetailsComponent
      }, {
        path: 'RFQ/RFQDetails/active/viewquote',
        component: ViewQuoteComponent
      }, {
        path: 'RFQ/RFQDetails/NotActive/viewquote',
        component: ExpQuoteComponent
      },
      {
        path: 'RFQ/RFQDetails/active/viewquote/payment',
        component: PaymentComponent
      },
      {
        path: 'RFQ/RFQDetails/active/viewquote/paymentConfirmation',
        component: PaymentConfirmationComponent
      },
      {
        path: 'Jobs',
        component: JobsComponent
      }, {
        path: 'Jobs/jobDetails/:status',
        component: JobsDetailsComponent
      },

      {
        path: 'Jobs/jobDetails/',
        component: JobsDetailsComponent
      },
      {
        path: 'Jobs/jobDetail/:status',
        component: JobDetailsComponent
      }, {
        path: 'Jobs/invoice',
        component: InvoiceComponent
      },
      {
        path: 'transactions',
        component: TransactionHistoryComponent
      }, {
        path: 'transactions/receipt',
        component: ReceiptComponent
      }, {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'terms',
        component: TermsComponent
      }

    ],
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
