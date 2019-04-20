import { Component, OnInit} from '@angular/core';
import { BlockChainService } from '../block-chain.service';
import { MatDialog } from '@angular/material';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit{

  data: any
  name: string
  constructor(
    private service : BlockChainService,
    private dialog: MatDialog) { }

  ngOnInit() {
    let addrs = localStorage.getItem('addrs')
    this.name = localStorage.getItem('name')
    this.service.getBalance(addrs).subscribe(
      data => {
        this.data = data
      }
    )
  }

  openDialog() {
    this.dialog.open(PaymentDialogComponent, {
      autoFocus: false,
      data: this.data
    })
  }

  fundBalance(addrs: string) {
      this.service.fundBalance(addrs).subscribe(
          res => {
            window.alert(`${res['msg']}. It might took awhile for balance to update`)
            window.location.reload()
          },

          err => console.log(err)
      )
  }

}
