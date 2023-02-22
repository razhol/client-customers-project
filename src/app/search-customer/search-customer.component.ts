import { Component } from '@angular/core';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from '../_models/customer';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from '../_services/customer-service.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.scss']
})
export class SearchCustomerComponent {
  public selectFromCustomer: number = 1
  public selectToCustomer: number = 1
  public errorMsg: string = ""
  public listOfCustomerNumber1: number[] = []
  public listOfCustomerNumber2: number[] = []
  public customers: Customer[] = []
  public selectCustomerType: string = "All";
  public customersClone: Customer[] = []
  public presentError: boolean = false;

  constructor(public dialog: MatDialog, private customerService: CustomerService, private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.AssignCustomersFromServer()
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogAddCustomerComponent, { autoFocus: true })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'please add a value for all the fields') {
        this.nullErrorArguments(result)
      }
      else {
        this.presentError = false;
        this.customerService.postCustomer(result).subscribe(x => {
          this.AssignCustomersFromServer()
        })
      }
    })
  }

  public nullErrorArguments(result: string) {
    this.errorMsg = result;
    this.presentError = true;
  }

  sraechByCustumerNumbers() {
    if (this.selectCustomerType == "") {
      this.customers = this.customersClone
    }
    else {
      this.customers = this.customersClone.filter(x => x.customerType == this.selectCustomerType)
    }
    if (Number(this.selectFromCustomer) <= Number(this.selectToCustomer)) {
      this.presentError = false;
      this.customers = this.customersClone.filter(x => x.customerNumber >= this.selectFromCustomer && x.customerNumber <= this.selectToCustomer)
    }
    else {
      this.errorMsg = 'to Number need to be bigger or equel then from Number';
      this.presentError = true;
    }
  }

  AssignCustomersFromServer() {
    this.spinner.show();
    this.customerService.getAllCustomers().subscribe(data => {
      this.customersClone = this.customers = data;
      this.presentError = false;
      this.spinner.hide();
      this.customers.map(x => x.disabledEdit = true)
      this.listOfCustomerNumber1 = this.customers.map(x => x.customerNumber);
      this.listOfCustomerNumber2 = this.listOfCustomerNumber1;
      this.selectToCustomer = this.selectFromCustomer = this.listOfCustomerNumber2[0]
    })
  }

}
