import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockChainService } from '../block-chain.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  btcFormGroup : FormGroup
  error: String
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private service: BlockChainService) { }

  ngOnInit() {
    this.btcFormGroup = this.builder.group({
      address: ['', [Validators.required]],
      name: ['', [Validators.required]]
    })
  }

  get address() {return this.btcFormGroup.get('address')}
  get name() { return this.btcFormGroup.get('name')}

  getAddress(addrs: string, name: string) {
    if(addrs.trim().length > 0 && !this.btcFormGroup.invalid)
    {
      this.service.getBalance(addrs).subscribe(
        res => {
          if(res) {
            localStorage.setItem('addrs', addrs)
            localStorage.setItem('name', name)
            this.router.navigateByUrl('/trans')
          }
        },
        err => {
          this.error = err.error
          window.alert(err.error)
        }
      )
    }
  }

  generate() {
    this.service.generateAddress().subscribe(
      res => {
        console.log(res)
        this.address.setValue(res.address)
      },
      err => {
        console.log(err)
      }
    )
  }
}
