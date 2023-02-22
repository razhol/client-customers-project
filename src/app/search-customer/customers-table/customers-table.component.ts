import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../../_models/customer'
import { CustomerService } from '../../_services/customer-service.service';

@Component({
  selector: 'customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent {
  @Input() customers: Customer[] = [];
  @Output() getCustumers = new EventEmitter();
  @Output() presentErrorEdit = new EventEmitter();
  constructor(private customerService: CustomerService) { }
  
  public updateCustomer(customer: Customer) {
    customer.disabledEdit = !customer.disabledEdit
    if (customer.disabledEdit == true) {
      if (customer.customerName == "" || customer.address == "" || customer.phoneNumber == "" ||
        customer.contentPerson == "" || customer.customerType == "") {
        this.presentErrorEdit.emit('please put a value for all the fields');
        return;
      }
      this.customerService.updateCustomer(customer, customer.customerNumber)
        .subscribe(response => {
          if (response) {
            this.getCustumers.emit()
          }
        })
    }
  }

  public deleteCustomer(customerNumber: number) {
    this.customerService.deleteCustomer(customerNumber).subscribe(response => {
      if (response) {
        this.getCustumers.emit()
      }
    })
  }
}
