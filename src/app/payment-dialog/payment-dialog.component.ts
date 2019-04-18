import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {

  paymentForm : FormGroup
  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.paymentForm = this.builder.group({
      sender: [''],
      amount: ['']
    })
  }

}
