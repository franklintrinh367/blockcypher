import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BlockChainService } from '../block-chain.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {

  paymentForm : FormGroup
  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
    private service: BlockChainService,
    @Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit() {
    this.paymentForm = this.builder.group({
      receiver: [''],
      amount: ['']
    })
  }

  get receiver() { return this.paymentForm.get('receiver')}
  get amount() { return this.paymentForm.get('amount')}

  makePayment(receiver, amount) {
    this.service.transfer(this.data.address, receiver, amount).subscribe(
      () => {
        //need task
      }
    )
  }

}
