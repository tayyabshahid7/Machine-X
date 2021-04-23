import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RfqAPIService } from '../../services/api/rfq-api.service';
import { QuoteAPIService } from '../../services/api/quote-api.service';
import { JobAPIService } from '../../services/api/job-api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuoteInvoiceInterface } from '../../models/quote.models';
import * as html2PDF from 'jspdf-html2canvas';

@Component({
  selector: 'app-quote-invoice-submitted',
  templateUrl: './quote-invoice-submitted.component.html',
  styleUrls: ['./quote-invoice-submitted.component.css']
})
export class QuoteInvoiceSubmittedComponent implements OnInit {
  quoteInvoice: QuoteInvoiceInterface = null;

  constructor(
    private route: ActivatedRoute,
    private modal: NzModalService,
    private router: Router,
    private rfqAPIService: RfqAPIService,
    private quoteAPIService: QuoteAPIService,
    private jobAPIService: JobAPIService,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService
  ) {
    debugger

  }

  ngOnInit(): void {
    const quoteId = this.route.snapshot.paramMap.get('quoteId');
    this.loadQuoteInvoice(quoteId);
  }

  loadQuoteInvoice(quoteId: string) {
    this.spinner.show();
    this.quoteAPIService.getQuoteInvoice(quoteId).subscribe(
      quoteInvoice => {
        this.quoteInvoice = quoteInvoice;
        this.spinner.hide();
      },
      error => {
        // TODO: review how to show error here
        this.notification.error('Error loading quote invoice', null);
        this.spinner.hide();
        this.router.navigate(['/dashboard/submittedQuote']);
      }
    );
  }

  downloadInvoice() {
    const pdfElement = document.getElementById('pdfAnchor');
    html2PDF(pdfElement, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/jpeg',
      success: (pdf) => {
        const fileName = `quote_${this.quoteInvoice.displayId}_invoice.pdf`;
        pdf.save(fileName);
        this.notification.success('Quote invoice Downloaded', null);
      }
    });
  }

}
