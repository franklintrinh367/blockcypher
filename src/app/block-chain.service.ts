import { Injectable, HostListener} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlockChainService{

  baseUrl = "http://localhost:3000"
  constructor(private http : HttpClient) { }

  getBalance(addrs: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/getBalance/${addrs}`)
  }

  fundBalance(addrs: string){
    const options = {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this.http.post(`${this.baseUrl}/funding`, {addrs: addrs}, options)
  }

  transfer(sender, receiver, amount) {
    const options = {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    }

      return this.http.post(`${this.baseUrl}/createTrans`, {
        sender: sender, receiver: receiver, amount : amount
      }, options)
  }

  generateAddress() : Observable<any> {
    return this.http.post(`${this.baseUrl}/generateAddress`, {})
  }
}
