import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';
import { slideInRightOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-toaster',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    slideInRightOnEnterAnimation({ duration: 500 })
  ]
})
export class ToastComponent extends Toast implements OnInit {
  toastStyle: any = {
    background: '',
    text      : '',
  }

  constructor(private toastService: ToastrService, public toastPackage: ToastPackage) {
    super(toastService, toastPackage);  
  }

  ngOnInit() {
    this.setToastTimeout();
    this.setToastStyle();
  }

  setToastTimeout() {
    setTimeout(() => this.remove(), this.options.timeOut);
  }

  setToastStyle() {
    const backgroundColors: any = {
      'toast-error'  : '#EF4444',
      'toast-success': '#10B981',
      'toast-info'   : '#3B82F6'
    }
    const textColors: any = {
      'toast-error'  : '#EF4444',
      'toast-success': '#10B981',
      'toast-info'   : '#3B82F6'
    }
    this.toastStyle.background = backgroundColors[this.toastPackage.toastType];
    this.toastStyle.text = textColors[this.toastPackage.toastType];
  }

}
