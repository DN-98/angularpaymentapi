import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSearch, faPlusSquare, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { PaymentDetail } from 'src/app/models/paymentDetail';
import { PaymentDetailService } from 'src/app/services/crud/payment-detail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnChanges {
  faSearch = faSearch;
  faPlusSquare = faPlusSquare;
  faTrash = faTrash;
  faEdit = faEdit;
  isModal = false;
  modalState = '';
  paymentDetail : any = '';
  paymentDetailBeforeFilter : any = '';
  targetItem: any = '';

  searchName = new FormControl('')

  handleClickTambah = () =>{
    this.isModal=true;
    this.modalState='create';
  }

  modalCloseHandler = (val : boolean) => {
    this.isModal= val;
    this.modalState= '';
    this.targetItem = '';
    this.updateState()
    
  }

  handleClickEdit = (item: PaymentDetail) => {
    this.targetItem = item;
    this.isModal = true;
    this.modalState = 'edit';
  }

  handleClickDelete = (id: number) => {
    this.targetItem = this.payment.getPaymentDetail(id).subscribe((res)=> res)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.payment.deletePaymentDetail(id).subscribe(val => {
          console.log(val);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ).then(()=> {
            this.payment.getPaymentDetailAll().subscribe(res => {
              this.paymentDetail = res
            })
          })
        })
      }
    })
    
  }

  updateState = () => {
    this.payment.getPaymentDetailAll().subscribe(res => {
      this.paymentDetail = res
    })
  }

  constructor(public payment: PaymentDetailService) { }

  ngOnInit(): void {
    this.updateState();
    
    this.searchName.valueChanges.subscribe(val => {
      if(val !== ''){
        let reg = new RegExp(`${val}`) 
        this.paymentDetail = this.paymentDetail.filter((a: any)=> reg.test(a.cardOwnerName));

      } else {
        this.updateState();
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
