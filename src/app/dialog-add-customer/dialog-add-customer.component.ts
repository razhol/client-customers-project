import { Component, Inject } from '@angular/core';
import { Customer } from '../_models/customer';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-customer',
  templateUrl: './dialog-add-customer.component.html',
  styleUrls: ['./dialog-add-customer.component.scss']
})
export class DialogAddCustomerComponent {
  public errorMsg:string = 'please add a value for all the fields';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.data = {
      customerNumber: 0, customerType: "", customerName: "", address: "",
      phoneNumber: "", contentPerson: "", disabledEdit: false
    }
  }

  public valueChange(value: any, fieldName: string) {
    this.data[fieldName] = value;
  }

  public returnCustumerObject() {
    return this.validateAndReturnData(this.data) ? this.data : this.errorMsg;
  }

  public validateAndReturnData(data:any) {
        if(data.customerName == "" || data.address == "" || data.phoneNumber  == "" ||
           data.contentPerson == "" || data.customerType == "") {
             return false
           }
        return true
  }

}
