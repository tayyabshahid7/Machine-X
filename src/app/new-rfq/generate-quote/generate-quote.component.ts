import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd/modal';
import {RfqAPIService} from '../../services/api/rfq-api.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NgxSpinnerService} from 'ngx-spinner';
import {RfqInterface} from '../../models/rfq.models';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {BufferService} from '../../services/buffer.service';
import {MAX_PLATFORM_FEES, PLATFORM_FEES_PERCENTAGE} from '../../utilities/constants';
import {precisionRound} from '../../utilities/app.utilities';

export const QUOTE_FORM_BUFFER_ITEM_KEY = 'quoteForm';

@Component({
    selector: 'app-generate-quote',
    templateUrl: './generate-quote.component.html',
    styleUrls: ['./generate-quote.component.css']
})
export class GenerateQuoteComponent implements OnInit {
    rfqId: string;
    rfq: RfqInterface = null;
    form: FormGroup;
    fileList: NzUploadFile[] = [];
    subtotal = 0;
    platformFees = 0;
    grandTotal = 0;
    dateFormat = 'MM.dd.yyyy';
    newLineItemDesc: string;
    newLineItemQuantity: number;
    newLineItemPrice: number;
    newLineItemTotalCost: number;
    pageNo: number = 1;
    engineerDetailsCollapse = 'Engineer Details';

    constructor(
        private route: ActivatedRoute,
        private modal: NzModalService,
        private router: Router,
        private rfqAPIService: RfqAPIService,
        private notification: NzNotificationService,
        private spinner: NgxSpinnerService,
        protected formBuilder: FormBuilder,
        protected bufferService: BufferService,
    ) {
    }

    ngOnInit(): void {
        this.rfqId = this.route.snapshot.paramMap.get('rfqId');
        this.loadRfq();
        this.initForms();
        this.addRemoveValidator(1);
    }

    changePage(pageNo: number): void {
        this.pageNo = pageNo;
        this.addRemoveValidator(this.pageNo);
    }

    addRemoveValidator(pageNo: number) {
        const tax: any = this.form.controls['tax'];
        const shippingRate: any = this.form.controls['shippingRate'];
        const lineItems: any = this.form.controls['lineItems'];
        if (pageNo === 2) {
            tax.setValidators([Validators.required, Validators.min(0)]);
            shippingRate.setValidators([Validators.required, Validators.min(0)]);
            lineItems.setValidators([Validators.required]);
            lineItems.updateValueAndValidity();
        } else {
            tax.clearValidators();
            tax.setValidators(null);
            tax.updateValueAndValidity();

            shippingRate.clearValidators();
            shippingRate.setValidators(null);
            shippingRate.updateValueAndValidity();

            lineItems.clearValidators();
            lineItems.setValidators(null);
            lineItems.updateValueAndValidity();
        }
    }


    rotateArrow(event): void {
        if (event.target.lastChild.classList.contains('arrow-up-down-rotate')) {
            event.target.lastChild.classList.remove('arrow-up-down-rotate');
        } else {
            event.target.lastChild.classList.add('arrow-up-down-rotate');
        }
    }

    loadRfq() {
        this.spinner.show('rfqSpinner');
        this.rfqAPIService.getRfq(this.rfqId).subscribe(
            rfq => {
                this.rfq = rfq;
                if (this.rfq.status !== 'accepting_quotes') {
                    this.router.navigate(['/dashboard/newRFQ/details', this.rfq.id]);
                }
                this.spinner.hide('rfqSpinner');
            },
            error => {
                // TODO: review how to show error here
                this.notification.error('Error loading rfq', null);
                this.spinner.hide('rfqSpinner');
                this.router.navigate(['/dashboard/newRFQ/details', this.rfq.id]);
            }
        );
    }

    initForms() {
        const bufferedForm = this.bufferService.getBufferItem(QUOTE_FORM_BUFFER_ITEM_KEY);
        if (bufferedForm) {
            this.form = bufferedForm;
            this.form.markAsDirty();
            this.form.markAllAsTouched();
            this.fileList = this.form.value.attachments;
            this.setTotals();
        } else {
            this.form = this.formBuilder.group({
                shopQuoteNumber: [null, [Validators.required, Validators.maxLength(64)]],
                shopQuoteNotes: [null, [Validators.required, Validators.maxLength(500)]],
                validForDays: [null, [Validators.required, Validators.min(0)]],
                deliveryDate: [null, [Validators.required]],
                attachments: [null, [Validators.required]],
                tax: [null],
                shippingRate: [null],
                lineItems: this.formBuilder.array([], Validators.required),
            });
        }
    }

    get lineItems(): FormArray {
        return this.form.get('lineItems') as FormArray;
    }

    addLineItem() {
        if (this.newLineItemDesc && this.newLineItemQuantity && this.newLineItemPrice !== undefined) {
            const newLineItem = this.formBuilder.group({
                description: [this.newLineItemDesc, [Validators.required, Validators.maxLength(25)]],
                quantity: [this.newLineItemQuantity, [Validators.required, Validators.min(0)]],
                price: [this.newLineItemPrice, [Validators.required, Validators.min(0)]],
            });
            this.lineItems.push(newLineItem);
            this.setTotals();
            this.resetNewLineItemFields();
        }
    }

    removeLineItem(index: number) {
        this.lineItems.removeAt(index);
        this.setTotals();
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

    newLineItemQuantityChange(value) {
        this.newLineItemQuantity = value;
        this.setNewLineItemTotalCost();
    }

    newLineItemPriceChange(value) {
        this.newLineItemPrice = value;
        this.setNewLineItemTotalCost();
    }

    setNewLineItemTotalCost() {
        this.newLineItemTotalCost = this.newLineItemPrice * this.newLineItemQuantity;
    }

    setTotals() {
        const lineItemsTotal = this.form.controls.lineItems.value.reduce((total, value) => total + (value.price * value.quantity), 0);
        this.subtotal = this.form.controls.shippingRate.value + lineItemsTotal;
        const amountBeforeFees = this.subtotal + this.form.controls.tax.value;
        const feesByPercentage = amountBeforeFees * PLATFORM_FEES_PERCENTAGE;
        this.platformFees = precisionRound(Math.min(MAX_PLATFORM_FEES, feesByPercentage), 2);
        this.grandTotal = this.form.controls.tax.value + this.subtotal + this.platformFees;
    }

    resetNewLineItemFields() {
        this.newLineItemDesc = undefined;
        this.newLineItemQuantity = undefined;
        this.newLineItemPrice = undefined;
        this.newLineItemTotalCost = undefined;
    }

    reviewForm() {
        this.bufferService.setBufferedItem(QUOTE_FORM_BUFFER_ITEM_KEY, this.form);
        this.router.navigate(['dashboard/newRFQ/details/', this.rfq.id, this.rfq.displayId, 'submit']);
    }

    showDeleteConfirm(): void {
        this.modal.confirm({
            nzStyle: {top: '40%'},
            nzTitle: '<b>Do you want to discard this item?</b>',
            nzContent: '<p style="color: #595959;">All of the information you added will be lost</p>',
            nzOkText: 'Yes',
            nzOkType: 'primary',
            nzOnOk: () => {
                this.bufferService.deleteBufferItem(QUOTE_FORM_BUFFER_ITEM_KEY);
                this.router.navigate(['dashboard/newRFQ/details/', this.rfq.id, this.rfq.displayId]);
            },
            nzCancelText: 'Cancel',
            nzOnCancel: () => {
            },
            nzMaskStyle: {background: 'rgb(0, 39, 102, 0.9)'}
        });
    }
}
