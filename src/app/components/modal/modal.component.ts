import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faUser, faCalendar, faLock, faCreditCard, faSave } from '@fortawesome/free-solid-svg-icons';
import { PaymentDetail } from 'src/app/models/paymentDetail';
import { PaymentDetailService } from 'src/app/services/crud/payment-detail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnChanges {
  @Input() modalState: string = '';
  @Input() targetItem: PaymentDetail = {
    paymentDetailId : 0,
    cardOwnerName :'',
    expirationDate :'',
    securityCode : ''
  };
  @Output() modalOpen: any = new EventEmitter();

  faUser = faUser;
  faCalendar = faCalendar;
  faLock = faLock;
  faCreditCard = faCreditCard;
  faSave = faSave;

  isCreate = false;
  isEdit = false;

  minDate = '';
  expDate = ''

  paymentForm = new FormGroup({
    cardOwnerName : new FormControl('', [Validators.required]),
    expirationDate : new FormControl('', [Validators.required]),
    securityCode : new FormControl('', [Validators.required, Validators.maxLength(3)])
  })

  get cardOwnerName(){
    return this.paymentForm.get('carOwnerName')
  }

  get expirationDate(){
    return this.paymentForm.get("expirationDate")
  }

  get securityCode(){
    return this.paymentForm.get("securityCode")
  }

  onPaymentForm = () => {
    if(this.isCreate){
      this.payment.createPaymentDetail(this.paymentForm.value).subscribe(res => {
        this.paymentForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Payment has been saved',
          showConfirmButton: false,
          timer: 1000
        }).then(()=>{
          this.isCreate=false;
          this.modalOpen.emit(false);
        })
      })
    } else {
    
      this.payment.updatePaymentDetail(this.targetItem.paymentDetailId, {paymentDetailId: this.targetItem.paymentDetailId, ...this.paymentForm.value})
      .subscribe(res => {
        this.paymentForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Payment has been updated',
          showConfirmButton: false,
          timer: 1000
        }).then(()=>{
          this.isCreate=false;
          this.modalOpen.emit(false);
        })
      })
    }
    
  }

  cancelEdit = () =>{
    this.isEdit = false;
    this.targetItem = {
      paymentDetailId : 0,
      cardOwnerName :'',
      expirationDate :'',
      securityCode : ''
    };
    this.modalOpen.emit(false);
  }

  cancelCreate = () => {
    this.isCreate = false;
    this.modalOpen.emit(false);
  }

  setModal = (state = '') => {
    switch(state){
      case 'edit':
        this.isEdit = true;
        break;
      case 'create':
        this.isCreate = true;
        break;
      default:
        this.isCreate = false
        this.isEdit = false;
        break;
    }
  }

  constructor(public payment: PaymentDetailService) { 
    let dateNow = new Date();
    let dateString = dateNow.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    this.minDate = [ dateString.slice(6), dateString.slice(3,5), dateString.slice(0,2)].join('-')
  }

  ngOnChanges(changes : SimpleChanges): void {
    this.setModal(this.modalState);
    if(this.isEdit){
      this.expDate = this.targetItem.expirationDate.slice(0,10);
      let item = {
        cardOwnerName : this.targetItem.cardOwnerName,
        expirationDate : this.expDate,
        securityCode : this.targetItem.securityCode
      }
      this.paymentForm.setValue(item)
    }
    
  }

}
