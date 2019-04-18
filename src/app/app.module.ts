import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatDividerModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionComponent } from './transaction/transaction.component'
import { HttpClientModule } from '@angular/common/http';
import { BlockChainService } from './block-chain.service';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransactionComponent,
    PaymentDialogComponent
  ],
  imports: [

    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PaymentDialogComponent]
})
export class AppModule { }
